
export const forget_auth = async (req, res, next) => {
    console.log(' forgetpass word authentiction validation ')


    const emailbmiit = /^\d+bmiit\d+@gmail\.com$/;
    const passwordRegex = /^[a-zA-Z0-9]{5,9}$/


    const email = req.body.email
    const hpassword = req.body.password
    const chpassword = req.body.chpassword

    console.log(hpassword);
    console.log(chpassword);
    console.log(email);

    if (
        emailbmiit.test(email) &&
        passwordRegex.test(hpassword)
    
    ) {
        next()
    } else {
        console.error('unauthorised')
        res.sendStatus(401)
    }
}