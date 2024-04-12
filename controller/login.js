import * as regmodel from '../model/regmodel.js';
import bcrpyt from 'bcrypt'


export const login = async (req, res) => {

    let finduser;
    await regmodel.Users.find({ user_email: req.body.email })
        .populate('roles_id')
        .then((user) => {

            finduser = user;

        })
        .catch((err) => {
            console.error(err);
            // Handle the error 
            res.status(500).json({ error: 'Internal Server Error' });
        });

    console.log(finduser);
    
    if (finduser.length > 0) {
        console.log("all done 1 ");
        const result=await bcrpyt.compareSync(req.body.password ,finduser[0].user_password);  

        console.log(result);

        console.log(finduser[0].roles_id[0]);
        if(result)  res.status(200).json(finduser);
        else res.status(404).json([{"nathi":1}]);
    }
    else{
        res.status(404).json([{"nathi":1}]);
    }


}                 