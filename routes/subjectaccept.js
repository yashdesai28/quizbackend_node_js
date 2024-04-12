import * as subaccept from '../controller/subjectaccept.js';

import express from 'express'

const server = express()

const subject_accept_router = express.Router();

subject_accept_router
.post('/accept',subaccept.subject_accept);


export {subject_accept_router as subject_accept_router}
 