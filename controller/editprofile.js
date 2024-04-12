import * as regmodel from '../model/regmodel.js';
import bcrpyt from 'bcrypt'

export const edit = async (req, res) => {

    let email;
    await regmodel.Student.find({ student_email: req.body.email })
        .then((user) => {

            email = user;

        })
        .catch((err) => {
            console.error(err);
            // Handle the error 
            res.status(500).json({ error: 'Internal Server Error' });
        });


    let student_enrollment_number;
    await regmodel.Student.find({ user_email: req.body.email })
        .then((user) => {

            student_enrollment_number = user;

        })
        .catch((err) => {
            console.error(err);
            // Handle the error 
            res.status(500).json({ error: 'Internal Server Error' });
        });


    if (email.length > 0) {

        console.log("Email");

    }
    else {


        if (student_enrollment_number.length > 0) {

            console.log("stud");
            const up = await regmodel.Student.updateOne(
                { _id: req.body.id },
                {
                    $set: {
                        student_email: req.body.email,
                        student_name: req.body.name
                    }
                }
            );


            const user1 = await regmodel.Users.updateOne(
                { roles_id: req.body.id },
                {
                    $set: {

                        user_email: req.body.email,

                    }
                }
            );

        }
        else {

            console.log("not stud");

            const up = await regmodel.Student.updateOne(
                { _id: req.body.id },
                {
                    $set: {
                        student_email: req.body.email,
                        student_name: req.body.name,
                        student_enrollment_number: req.body.enrollment_number
                    }
                }
            );


            const user1 = await regmodel.Users.updateOne(
                { roles_id: req.body.id },
                {
                    $set: {

                        user_email: req.body.email,

                    }
                }
            );


            res.status(200).json({ up, user1 })

        }

        console.log("not email");
    }





}


export const techer_edit = async (req, res) => {

    let email;
    await regmodel.Teacher.find({ teacher_email: req.body.email })
        .then((user) => {

            email = user;

        })
        .catch((err) => {
            console.error(err);
            // Handle the error 
            res.status(500).json({ error: 'Internal Server Error' });
        });



    if (email.length > 0) {

        console.log("Email");
        const up = await regmodel.Teacher.updateOne(
            { _id: req.body.id },
            {
                $set: {

                    teacher_name: req.body.name
                }
            }
        );

    } 
    else {




        console.log("stud");
        const up = await regmodel.Teacher.updateOne(
            { _id: req.body.id },
            {
                $set: {
                    teacher_email: req.body.email,
                    teacher_name: req.body.name
                }
            }
        );


        const user1 = await regmodel.Users.updateOne(
            { roles_id: req.body.id },
            {
                $set: {

                    user_email: req.body.email,

                }
            }
        );


        console.log("not email");
    }



}      