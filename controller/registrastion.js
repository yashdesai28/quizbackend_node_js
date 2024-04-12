import * as regmodel from '../model/regmodel.js';
import bcrpyt from 'bcrypt'

export const student_registrastion = async (req, res) => {

    let objid;
    let flag = 0;

    await regmodel.Users.find({ user_email: req.body.email }).then((userdata) => {
        if (userdata.length > 0) {
            console.log("User already exists");
            flag = 0;

        } else {
            console.log("User not found");
            flag = 1;
        }
    })

    console.log(flag);

    //student table  reg
    if (flag == 1) {
        const studentreg = regmodel.Student();
        studentreg.student_name = req.body.name
        studentreg.student_email = req.body.email
        studentreg.student_enrollment_number = req.body.eno
        objid = await studentreg.save();


        //user table  reg 
        const saltRounds = 10
        const hashedPassword = await bcrpyt.hashSync(req.body.password, saltRounds);

        const user = regmodel.Users();
        user.roles_id = objid._id
        user.user_email = req.body.email
        user.user_password = hashedPassword;
        user.user_role = "Student";
        user.user_status = "1"
        user.save();

        console.log("all done", objid._id);
        res.status(200).json(res.body)

    } else {
        console.log("user found in table so not use this email because it already use  done");
        res.status(401).json(res.body)

    }

}

export const teacher_registrastion = async (req, res) => {


    let objid;
    let flag = 0;

    await regmodel.Users.find({ user_email: req.body.email }).then((userdata) => {
        if (userdata.length > 0) {
            console.log("User already exists");
            flag = 0;

        } else {
            console.log("User not found");
            flag = 1;
        }
    })

    console.log(flag);



    //teacher table  reg
    if (flag == 1) {
        const teachereg = regmodel.Teacher();
        teachereg.teacher_name = req.body.name
        teachereg.teacher_email = req.body.email
        objid = await teachereg.save();


        // user table  reg
        const saltRounds = 10
        const hashedPassword = await bcrpyt.hashSync(req.body.password, saltRounds);

        const user = regmodel.Users();
        user.user_password = hashedPassword;
        user.roles_id = objid._id
        user.user_email = req.body.email
        user.user_role = "Teacher";
        user.user_status = "2"
        user.save();


        console.log("all done");
        res.status(200).json(req.body);
    } else {
        res.status(401).json(res.body)

    }



}