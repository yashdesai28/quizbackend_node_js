import * as regmodel from '../model/regmodel.js';
import * as subjectmodel from '../model/subject.js';
import bcrpyt from 'bcrypt'


export const show_subject = async (req, res) => {

    console.log(req.body.id);

    let finduser;
    await regmodel.Student.find({ _id: req.body.id })
        .populate('subject')
        .then((user) => {

            finduser = user;
        }) 
        .catch((err) => {
            console.error(err);
            // Handle the error
            res.status(500).json({ error: 'Internal Server Error' });
        });


    // console.log(finduser[0].subject);

    if (finduser.length > 0) res.status(200).json(finduser[0].subject);
    else res.status(404).json([{ "nathi": 1 }]);

}


export const show_subject_teacher = async (req, res) => {

    console.log(req.body.id,"top");

    let finduser = await subjectmodel.Subject.find({ 
        Teacherid: req.body.id });


    console.log(finduser, "hii");

    if (finduser.length > 0) res.status(200).json(finduser);
    else res.status(404).json([{ "nathi": 1 }]);

}                 