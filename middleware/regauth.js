export const student_reg_auth = async (req, res, next) => {
  
  console.log(' student registrastion authentiction validation ')

  var nameRegex = /^[A-Za-z]+$/
  const emailbmiit = /^\d+bmiit\d+@gmail\.com$/;
  const passwordRegex = /^[a-zA-Z0-9]{5,9}$/


  const name = req.body.lname
  const email = req.body.email
  const hpassword = req.body.password
  const chpassword = req.body.chpassword


  if (
    nameRegex.test(name) &&
    emailbmiit.test(email) &&
    passwordRegex.test(hpassword) &&
    hpassword == chpassword
  ) {
    next()
  } else {
    console.error('unauthorised')
    res.sendStatus(401)
  }
}


export const teacher_reg_auth = async (req, res, next) => {
  console.log(' teacher registrastion authentiction validation ')

  var nameRegex = /^[A-Za-z]+$/
  const emailbmiit = /^\d+bmiit\d+@gmail\.com$/;
  const passwordRegex = /^[a-zA-Z0-9]{5,9}$/


  const name = req.body.lname
  const email = req.body.email
  const hpassword = req.body.password
  const chpassword = req.body.chpassword


  if (
    nameRegex.test(name) &&
    emailbmiit.test(email) &&
    passwordRegex.test(hpassword) &&
    hpassword == chpassword
  ) {
    next()
  } else {
    console.error('unauthorised')
    res.sendStatus(401)
  }
}