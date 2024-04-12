import * as sendotp from '../controller/sendotp.js';

import express from 'express'

const server = express()

const otp_router = express.Router();

otp_router
.post('/sendotp',sendotp.send_otp);


export {otp_router as otp_router}
