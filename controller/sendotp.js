import { createTransport } from 'nodemailer';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as regmodel from '../model/regmodel.js';


export const send_otp = async (req, res) => {

    let flag = 0;
    let objid ;
    let otp;

    await regmodel.Users.find({ user_email: req.body.email }).then((userdata) => {
        if (userdata.length > 0) {
            console.log("User already exists");
            objid = userdata;
            flag = 0;

        } else {
            console.log("User not found");
            flag = 1;
        }
    })

    console.log(flag);



    if(flag===0){

        const indexPath = join('./controller', 'index.html');
        const content = readFileSync(indexPath, 'utf-8');
        // Your file handling logic here
    
    
        // Function to generate a random 6-digit OTP
        const generateOTP = () => {
            return Math.floor(100000 + Math.random() * 900000).toString();
        };
    
        // Create a Nodemailer transporter
        const transporter = createTransport({
            service: 'gmail',
            auth: {
                user: 'omniiyu2022@gmail.com',
                pass: 'bnri kkoz pnqq npip',
            },
        });
    
        // Function to send OTP email
        const sendOTPEmail = (recipientEmail) => {
            otp = generateOTP();
    
            const mailOptions = {
                from: 'omniiyu2022@gmail.com',
                to: recipientEmail, 
                subject: 'OTP Verification', 
                html: content.replace('{{otp}}', otp),
            };
    
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
        }; 
    
        // Example: Send OTP email to a recipient
        const recipientEmail = req.body.email;
        sendOTPEmail(recipientEmail);

        res.status(200).json({
            email:objid[0].user_email,
            _id:objid[0]._id,
            otp:otp
        })

    }
    else{
        res.status(404).json({})

    }


}                 