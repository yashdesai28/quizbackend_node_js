import * as editprofile from '../controller/editprofile.js';

import express from 'express'

const server = express()

const edit_router = express.Router();


edit_router
.post('/edpro',editprofile.edit)
.post('/edtech',editprofile.techer_edit);



export {edit_router as edit_router}
