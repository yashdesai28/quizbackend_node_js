import * as regmodel from '../controller/registrastion.js';
import * as regauth from '../middleware/regauth.js' 
import express from 'express'

const server = express()

const teacher_reg_router = express.Router();

teacher_reg_router
.post('/treg',regauth.teacher_reg_auth,regmodel.teacher_registrastion);


export {teacher_reg_router as teacher_reg_router}
