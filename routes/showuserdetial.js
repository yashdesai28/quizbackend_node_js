import * as showuserdetils from '../controller/showuserdetils.js';

import express from 'express'

const server = express()

const showuserdetils_router = express.Router();

showuserdetils_router
    .post('/showteacher', showuserdetils.techer_details)
    .post('/showstudent', showuserdetils.student_details);


export { showuserdetils_router as showuserdetils_router }
