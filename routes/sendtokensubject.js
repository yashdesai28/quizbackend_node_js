import * as sendsubjecttoken from '../controller/sendtokensubject.js';
import * as shownotification from '../controller/Notificationshow.js'

import express from 'express'

const server = express()

const send_subject_token_router = express.Router();

send_subject_token_router
.post('/sendsubjecttoken',sendsubjecttoken.send_subject_token)
.post('/shownotification',shownotification.show_notification_list)


export {send_subject_token_router as send_subject_token_router}
