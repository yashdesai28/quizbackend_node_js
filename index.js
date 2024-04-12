import express, { json } from "express";
import mongoose from "mongoose";
import cors from 'cors'
import multer from "multer";
import bodyParser from 'body-parser';
import { reg_router as regrouter } from './routes/registrastion.js';
import { teacher_reg_router as teachereg } from "./routes/teacher_registrastion.js";
import { login_router as loginrouter} from "./routes/login.js";
import { passforgot_router as passforgotrouter} from "./routes/forgot_password.js";
import { otp_router as otprouter} from "./routes/sendotp.js";
import { send_subject_token_router as  sendsubjecttokenrouter } from "./routes/sendtokensubject.js"
import { subject_accept_router as  subjectacceptrouter } from "./routes/subjectaccept.js"
import { subject__reg_router as  subjectregrouter } from "./routes/subject_reg.js"
import {show_subject_router as showsubjectrouter} from "./routes/showsubject.js"
import {addquiz_router as addquizrouter} from "./routes/addquiz.js"
import { basicfile_router as basicfilerouter } from "./routes/basicfile.js";
import {showuserdetils_router as showuserdetils} from "./routes/showuserdetial.js"
import {edit_router as editrouter} from "./routes/editprofile.js"
import {result_router as resultrouter} from "./routes/Result.js"
import {delete_quiz_router as deletequizrouter} from "./routes/deletequiz.js"





//conection code for mongodb
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ganpatibapaquiz");

  console.log("database is connected");
}

//start server
const server = express();

server.use(express.json()); 
server.use(cors());
server.use('/',basicfilerouter);
const uplod = multer();
server.use(uplod.array())

server.use(bodyParser.urlencoded({ extended: true }));


server.use('/',regrouter);
server.use('/',teachereg);
server.use('/',loginrouter);
server.use('/',otprouter);
server.use('/',passforgotrouter);
server.use('/',sendsubjecttokenrouter);
server.use('/',subjectacceptrouter);
server.use('/',subjectregrouter);
server.use('/',showsubjectrouter);
server.use('/',addquizrouter);
server.use('/',showuserdetils);
server.use('/',editrouter);
server.use('/',resultrouter);
server.use('/',deletequizrouter);




server.listen(8080, () => {
  console.log("server is runing");
});
