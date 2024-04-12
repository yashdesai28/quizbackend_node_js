import * as subjectreg from '../controller/subject_reg.js';

import express from 'express'

const server = express()

const subject__reg_router = express.Router();

subject__reg_router
.post('/subjectreg',subjectreg.student_registrastion);


export {subject__reg_router as subject__reg_router}
