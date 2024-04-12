import jwt from 'jsonwebtoken';
import { createTransport } from 'nodemailer';
import csv from 'csv-parser';
import fs from 'fs';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as regmodel from '../model/regmodel.js';
import * as submodel from '../model/subject.js';
import { ObjectId } from 'mongodb';
import * as notificationmodel from '../model/notification.js';
const { toDateString, toLocaleTimeString } = new Date();

export const send_subject_token = async (req, res) => {

  const indexPath = join('./controller', 'accept.html');
  let content = readFileSync(indexPath, 'utf-8');

  // Generate JWT token
  const generateToken = (email) => {
    return jwt.sign({ email }, 'your_secret_key', { expiresIn: '1h' });
  };

  const getvalues = async (email1, token) => {
    const currentDate = new Date();

    // Get the date and time as separate strings
    const dateStr = currentDate.toDateString();
    const timeStr = currentDate.toLocaleTimeString();

    // Combine date and time strings
    const dateTimeStr = dateStr + " / " + timeStr;

    const email = email1.replace(',', '');
    let finduser;

    let flag = 0;



    await regmodel.Users.find({ user_email: email })
      .populate('roles_id')
      .then((user) => {
        if (user.length > 0) {
          finduser = user;
          flag = 1;
        } else {
          flag = 0;
        }


      })
      .catch((err) => {
        console.error(err);
        // Handle the error
        res.status(500).json({ error: 'Internal Server Error' });
      });


    const objectId = new ObjectId(req.body.teacherid);

    let subdetail = await submodel.Subject
      .find({
        $and: [
          { subject_name: req.body.name },
          { Teacherid: objectId }
        ]
      }).populate('Teacherid')


    const { subject_name, subject_code } = subdetail[0];
    if (flag === 1) {
      console.log("user find reg", email);




      console.log("============", subdetail);




      console.log(flag);
      console.log(finduser[0].roles_id);

      let senddataemail = {
        studentid: finduser[0].roles_id[0]._id,
        studentemail: finduser[0].roles_id[0].student_email,
        role: "Student",
        status: "pending",
        date: dateTimeStr,
        lastactivity: "",
        tokenid: token,
        teacherid: req.body.teacherid,
        subjectname: subject_name,
        subjectcode: subject_code,
        teachername: subdetail[0].Teacherid.teacher_name,
        subjectid: subdetail[0]._id

      };
      console.log(senddataemail);
      return senddataemail;
    }
    else {
      console.log("user not find reg", email);

      let senddataemail1 = {
        studentid: null,
        studentemail: email,
        role: "pending reg",
        status: "pending",
        date: dateTimeStr,
        lastactivity: "",
        tokenid: token,
        teacherid: req.body.teacherid,
        subjectname: subject_name,
        subjectcode: subject_code,
        teachername: subdetail[0].Teacherid.teacher_name,
        subjectid: subdetail[0]._id

      };
      console.log(senddataemail1);
      return senddataemail1

    }



  }
  const sendTokenEmails = async (emailAddresses) => {
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: 'omniiyu2022@gmail.com',
        pass: 'bnri kkoz pnqq npip',
      },
    });

    const emailPromises = emailAddresses.reduce((promiseChain, email) => {
      return promiseChain.then(async () => {
        const token = generateToken(email);
        console.log(email, "====", token);



        const emaildata = await getvalues(email, token);

        // Replace value="" attributes with the token value
        const regexValue = /value=""/g;
        let updatedContent = content.replace(regexValue, `value="${token}"`);

        // Replace value="123" attribute associated with name="role" with the role value
        const regexRole = /name="role"\s+value="123"/;
        updatedContent = updatedContent.replace(regexRole, `name="role" value="${emaildata.role}"`);

        // Replace other placeholders with corresponding emaildata values
        updatedContent = updatedContent.replace('[email]', emaildata.studentemail)
          .replace('[subject]', emaildata.subjectname)
          .replace('[code]', emaildata.subjectcode)
          .replace('[name]', emaildata.teachername);


        const notification = notificationmodel.Notification();
        notification.student_id = emaildata.studentid
        notification.student_email = emaildata.studentemail
        notification.role = emaildata.role
        notification.status = emaildata.status
        notification.date_time = emaildata.date
        notification.Last_activity = emaildata.lastactivity
        notification.token_id = emaildata.tokenid
        notification.subject = emaildata.subjectid
        notification.teacher_id = emaildata.teacherid
        await notification.save();

        const mailOptions = {
          from: 'omniiyu2022@gmail.com',
          to: email,
          subject: 'Login Token',
          html: updatedContent // Use the updated content here
        };

        try {
          const info = await transporter.sendMail(mailOptions);
          console.log(`Email sent to ${email}:`, info.response);
        } catch (error) {
          console.error(`Error sending email to ${email}:`, error);
        }
      });
    }, Promise.resolve());

    const chek = await emailPromises;
    console.log(chek, 'cheks');

  };





  const readEmailAddressesFromCSV = (line) => {
    console.log(line, "hii");
    const emailAddresses = [];

    // // Read email addresses from CSV file
    // fs.readFile(filePath, 'utf8', (err, data) => {
    //   if (err) {
    //     console.error('Error reading CSV file:', err); 
    //     return;
    //   }

    // Split the data by newline character
    if (!line) {
      console.log('No data provided in the request.');
      return;
    }



    // Split the data by newline character
    const lines = line.trim().split(/\r?\n/);
    lines.forEach((line) => {
      const email = line.trim(); // Trim to remove any leading/trailing whitespace
      if (email) {
        emailAddresses.push(email);
      }
    });

    if (emailAddresses.length === 0) {
      console.log('No email addresses found in the CSV file.');
    } else {
      console.log('Email addresses read from CSV:', emailAddresses);
      sendTokenEmails(emailAddresses); // Call sendTokenEmails function with the extracted email addresses
    }
    // });
  };




  // Example usage: Provide the path to your CSV file containing email addresses
  readEmailAddressesFromCSV(req.body.emails);
  console.log(req.body.emails);
  // readEmailAddressesFromCSV('D:/8sempeoject/backend/narayanmunidev/controller/emails.csv');


}                 
