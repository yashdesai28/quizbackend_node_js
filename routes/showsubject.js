import * as showsub from '../controller/showsubject.js';
import * as showlistquiz from '../controller/showquizlist.js';
import * as showquizque from '../controller/show_quiz_que.js';

import express from 'express'

const server = express()

const show_subject_router = express.Router();

show_subject_router
.post('/showsubject',showsub.show_subject)
.post('/showsubjectteacher',showsub.show_subject_teacher)
.post('/showlistquiz',showlistquiz.show_quiz_list)
.post('/showlistallquiz',showlistquiz.show_quizall_list)
.post('/showquizque',showquizque.show_quiz_que);


export {show_subject_router  as show_subject_router}
