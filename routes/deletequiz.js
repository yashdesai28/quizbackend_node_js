import * as quiz from '../controller/deletequiz.js';


import express from 'express'

const server = express()

const delete_quiz_router = express.Router();

delete_quiz_router
.post('/dquiz',quiz.delete_quiz);

export {delete_quiz_router as delete_quiz_router}
