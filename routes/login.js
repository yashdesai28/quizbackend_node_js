import * as regmodel from '../controller/login.js';
import * as loginauth from '../middleware/loginauth.js' 
import express from 'express'

const server = express()

const login_router = express.Router();

login_router
.post('/login',loginauth.login_auth,regmodel.login);


export {login_router as login_router}
