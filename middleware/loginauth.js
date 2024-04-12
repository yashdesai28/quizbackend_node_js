
//hostelar registration  midelwar
export const login_auth = async (req, res, next) => {
    console.log(' login  authentiction validation ')
  
   
    const emailbmiit = /^\d+bmiit\d+@gmail\.com$/;
    const passwordRegex = /^[a-zA-Z0-9]{5,9}$/
  
 
    const email = req.body.email
    const hpassword = req.body.password
  
    console.log(email, hpassword);
 
  
    if (
     
      emailbmiit.test(email) &&passwordRegex.test(hpassword) 
    
    ) {
      next()
    } else {
      console.error('unauthorised')
      res.sendStatus(401)
    }
  }
