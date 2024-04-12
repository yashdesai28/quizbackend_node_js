import * as notificationmodel from '../model/notification.js';
import * as regmodel from '../model/regmodel.js';
import { ObjectId } from 'mongodb';

export const subject_accept = async (req, res) => {

    const currentDate = new Date();

    // Get the date and time as separate strings
    const dateStr = currentDate.toDateString();
    const timeStr = currentDate.toLocaleTimeString();

    // Combine date and time strings
    const dateTimeStr = dateStr + " / " + timeStr;

    console.log("request sent from mail");
    const accept = await notificationmodel.Notification.updateMany(
        { token_id: req.body.action }, // Condition to match documents
        { $set: { status: "accept", Last_activity: dateTimeStr } } // Update operation
    );
    console.log(req.body.action);
    console.log("===", req.body.role);

    if (req.body.role === "Student") {

        const studentid = await notificationmodel.Notification.find({ token_id: req.body.action });

        if(studentid.length >0){
            
        console.log("===", studentid[0]);
        console.log("===", studentid[0].student_id);
        console.log("===", studentid[0].subject);

        // Assuming you have the ObjectId object already
        const objectId = studentid[0].subject;


        // const student = await regmodel.Student.find({_id:studentid[0].student_id});

        const subjectaddstudent = await regmodel.Student.updateMany(
            { _id: studentid[0].student_id }, // Condition to match documents
            { $push: { subject: studentid[0].subject } } // Update operation
        );
        console.log("===", subjectaddstudent);


        }else{
            console.log("else accespt");
        }



    }







}                 