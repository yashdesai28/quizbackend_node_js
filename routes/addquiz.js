import * as quiz from '../controller/addquiz.js';


import express from 'express'

const server = express()

const addquiz_router = express.Router();

addquiz_router
.post('/addquiz',quiz.add_quiz);

export {addquiz_router as addquiz_router}
