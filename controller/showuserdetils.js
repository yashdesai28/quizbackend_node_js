import * as regmodel from '../model/regmodel.js';
import bcrpyt from 'bcrypt'



export const techer_details = async (req, res) => {

    console.log('techer_details');

    let finduser;
    await regmodel.Teacher.find({ _id: req.body.id })
        .then((user) => {
            finduser = user;

        })
        .catch((err) => {
            console.error(err);
            // Handle the error 
            res.status(500).json({ error: 'Internal Server Error' });
        });

    console.log(finduser);
    if (finduser.length > 0) {

        res.status(200).json(finduser);

    }
    else {
        res.status(404).json([{ "nathi": 1 }]);
    }


}     

export const student_details = async (req, res) => {

    let finduser;
    await regmodel.Student.find({ _id: req.body.id })
        .then((user) => {

            finduser = user;

        })
        .catch((err) => {
            console.error(err);
            // Handle the error 
            res.status(500).json({ error: 'Internal Server Error' });
        });

    console.log(finduser);
    if (finduser.length > 0) {

        res.status(200).json(finduser);

    }
    else {
        res.status(404).json([{ "nathi": 1 }]);
    }


}      