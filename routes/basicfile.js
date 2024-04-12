import * as basicfile from '../controller/basicfileuplod.js';
import * as quiz from '../controller/addquiz.js';
import multer from 'multer';
import express from 'express';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'drpwjoiik',
    api_key: '474321252288291',
    api_secret: 'UFa_BDNnpkj0vhCC8o7IPGvaNc8'
});


const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

// const upload = multer({ dest: 'uploads/' });

const server = express();

const basicfile_router = express.Router();

var type = upload.single('file')

basicfile_router
    .post('/basicfile', type, function (req, res) {
    
        // console.log(req.file);
        console.log(req.file);
        console.log(req);
        cloudinary.uploader.upload(req.file.path, { public_id: req.file.originalname, resource_type: 'auto' } , function (err, result) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Error"
                })
            }

            res.status(200).json({
                success: true,
                message: "Uploaded!",
                data: result
            }) 
            quiz.add_quiz(req,result.secure_url,result.secure_url)
        })


    });

export { basicfile_router as basicfile_router };
