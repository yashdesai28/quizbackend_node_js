import * as result from '../controller/Result.js';

import express from 'express'

const server = express()

const result_router = express.Router();

result_router
    .post('/result', result.Assessment)
    .post('/showresult', result.show_result)
    .post('/stresult', result.show_result_for_teacher);

export { result_router as result_router }
