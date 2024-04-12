import * as submodel from '../model/subject.js';
import * as regmodel from '../model/regmodel.js';
import { ObjectId } from 'mongodb';
import { readFileSync } from 'fs';
import { join } from 'path';


export const student_registrastion = async (req, res) => {



    const objectId = new ObjectId(req.body.teacherid);

    let flag = 0;


    await submodel.Subject
        .find({
            $and: [
                { subject_name: req.body.name },
                { Teacherid: objectId }
            ]
        }).then((subject) => {

            console.log(subject.length);
            if (subject.length <= 0) {
                console.log("Subject is not found in  your data");
                flag = 1

            } else {
                console.log("Subject is  found in  your data");
                flag = 0
            }

        })

    console.log(flag);
    let objid;
    if (flag === 1) {


        console.log("this is subject reg page");

        const subjectreg = submodel.Subject();
        subjectreg.subject_name = req.body.name
        subjectreg.subject_code = req.body.code
        subjectreg.Teacherid = req.body.teacherid
        objid = await subjectreg.save();

        const subjectaddstudent = await regmodel.Teacher.updateMany(
            { _id: req.body.teacherid }, // Condition to match documents
            { $push: { subject: objid._id } } // Update operation
        );

        console.log(objid._id);

        console.log(subjectaddstudent);

        res.status(200).json(objid)
    }
    else {
        res.status(401).json({ message: "This Subject already exists" })
    }




}
