import * as Resultmodel from '../model/Result.js';
import * as subjectmodel from '../model/subject.js';
import { ObjectId } from 'mongodb';
import bcrpyt from 'bcrypt'

export const Assessment = async (req, res) => {

    console.log('Assessment');

    const objectId = new ObjectId(new ObjectId('6612ddebb7a487cd1dbfb188'));
    console.log(objectId);



    let findsubject;
    await subjectmodel.Subject.find({ _id: req.body.subject_id })
        .then((user) => {

            findsubject = user;
        })
        .catch((err) => {
            console.error(err);
            // Handle the error
            res.status(500).json({ error: 'Internal Server Error' });
        });



    if (findsubject.length > 0) {
        console.log(findsubject[0].Teacherid);
        try {
            // Check if the student ID already exists in the database
            const existingResult = await Resultmodel.Assessment.findOne({ student_id: req.body.student_id });

            if (existingResult) {
                // Student ID already exists, update assessment data
                existingResult.assessment_data.push({
                    teacher_id: findsubject[0].Teacherid,
                    subject_id: req.body.subject_id,
                    quiz_id: req.body.quiz_id,
                    date: req.body.date,
                    total: req.body.total
                });

                // Save the updated document
                const updatedResult = await existingResult.save();
                console.log('Existing result document updated:', updatedResult);
                // Respond with success message or updated document
                res.status(200).json({ message: 'Existing result document updated', data: updatedResult });
            } else {
                // Student ID doesn't exist, create a new record
                const newResult = new Resultmodel.Assessment({
                    student_id: req.body.student_id,
                    assessment_data: [{
                        teacher_id: findsubject[0].Teacherid,
                        subject_id: req.body.subject_id,
                        quiz_id: req.body.quiz_id,
                        date: req.body.date,
                        total: req.body.total
                    }]
                });

                // Save the new document
                const savedResult = await newResult.save();
                console.log('New result document saved:', savedResult);
                // Respond with success message or new document
                res.status(201).json({ message: 'New result document saved', data: savedResult });
            }
        } catch (error) {
            console.error('Error:', error);
            // Respond with error message
            res.status(500).json({ error: 'Internal server error' });
        }
    }


}



export const show_result = async (req, res) => {

    await Resultmodel.Assessment.find({ student_id: req.body.id })
        .populate({
            path: 'assessment_data',
            populate: {
                path: 'teacher_id subject_id quiz_id',
                select: 'teacher_name subject_name quiz_name total_marks passing_marks'

            }
        })
        .then(assessments => {
            console.log('Assessments with populated data:', assessments);
            res.status(200).json({ data: assessments });
        })
        .catch(error => {
            console.error('Error fetching assessments:', error);
            // Handle error or return response
        });




}



export const show_result_for_teacher = async (req, res) => {

    await Resultmodel.Assessment.find({ 'assessment_data.teacher_id': req.body.id })
        .populate({
            path: 'assessment_data ',
            populate: {
                path: 'teacher_id subject_id quiz_id',
                select: 'teacher_name subject_name quiz_name total_marks passing_marks'

            }
        }).populate('student_id', 'student_name student_email student_enrollment_number')
        .then(assessments => {
            console.log('Assessments with populated data:', assessments);
            res.status(200).json({ data: assessments });
        })
        .catch(error => {
            console.error('Error fetching assessments:', error);
            // Handle error or return response
        });




}