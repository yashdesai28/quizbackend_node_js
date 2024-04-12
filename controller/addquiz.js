import csv from 'csv-parser';
import Papa from 'papaparse';
import axios from 'axios';
import * as quizmodel from '../model/quiz.js';
import * as subjectmodel from '../model/subject.js';
import fs from 'fs';
import { readFileSync } from 'fs';
import { join } from 'path';

export const add_quiz = async (req, filePath,secure_url) => {
    console.log('add_quiz');

    console.log(req.body);

    let mainquiz = [];
    let mainquizans = [];
    const readEmailAddressesFromCSV = async (filePath) => {

        const emailAddresses = [];
        let quizData;

        console.log(filePath);

        // Read email addresses from CSV file
        // await fs.readFile(filePath, 'utf8', async (err, data) => {
        //     if (err) {
        //         console.error('Error reading CSV file:', err);
        //         return;
        //     }
        //     else {
        //         console.log(data);
        //     }

        //     if (data) {
        //         await Papa.parse(data, {
        //             complete: function (results) {
        //                 quizData = results.data;
        //                 console.log(quizData, "complete");
        //             }
        //         });
        //     }

        const response = await axios.get(filePath); // Download the CSV file
        const csvData = response.data;

        const quizData1 = Papa.parse(csvData, {

        });

        console.log("helo ji ", quizData1.data);
        let quizData2 = quizData1.data;
        console.log("helo ji222 ", quizData2);

        quizData2.map((data, index, arr) => {
            console.log(data);
            let que;
            let ans;
            let option = [];

            data.map((indata, index, arr) => {
                if (index === 0) {
                    que = indata;

                }
                else if (index != arr.length - 1) {
                    option.push(indata);
                }
                else if (index == arr.length - 1) {
                    ans = indata;
                }


                console.log(arr.length);
                console.log(indata, "[" + index + "]");

            });

            const mainobj = {
                que: que,
                option: [...option]
            }
            const ansque = {
                que: que,
                ans: ans
            }

            mainquiz.push(mainobj);
            mainquizans.push(ansque);


        });

        console.log("===", mainquiz);
        console.log("ansss", mainquizans);

        let objid;
        const assquiz = quizmodel.Quizzes();
        assquiz.quiz_name = req.body.name;
        assquiz.Quiz_data = mainquiz
        assquiz.Quiz_ans = mainquizans
        assquiz.subjectid = req.body.subid;
        assquiz.Teacherid = req.body.tid;
        assquiz.total_marks = req.body.tmarks;
        assquiz.passing_marks = req.body.pmarks;
        assquiz.start_time = req.body.startt;
        assquiz.end_time = req.body.endt;
        assquiz.secure_url_cvs = secure_url; 
        objid = await assquiz.save();

        
        const quizaddsubject = await subjectmodel.Subject.updateMany(
            { _id: req.body.subid }, // Condition to match documents
            { $push: { Quizzes: objid._id } } // Update operation
        );

        console.log(objid.Quiz_data);

        // });
        console.log("===", mainquiz);
        

    };


    readEmailAddressesFromCSV(filePath);



}                 