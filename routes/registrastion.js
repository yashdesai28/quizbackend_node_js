import * as reg from '../controller/registrastion.js';
import * as regauth from '../middleware/regauth.js' 
import express from 'express'

const server = express()

const reg_router = express.Router();

reg_router
.post('/sreg',regauth.student_reg_auth,reg.student_registrastion);

export {reg_router as reg_router} 