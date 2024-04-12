import * as forget from '../controller/forgot_password.js';
import * as forgetschem from '../middleware/forgetauth.js'

import express from 'express'

const server = express()

const passforgot_router = express.Router();

passforgot_router
.post('/fogotpassword',forgetschem.forget_auth,forget.forgot_password);

export {passforgot_router as passforgot_router}
