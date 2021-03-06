const bcryptjs = require('bcryptjs');
const User = require('../../models/user/User');

// Generate Encrypt Password
const generateHashPassWord = async (pass) => {
  // generate random salt
  let salt = await bcryptjs.genSalt(10); 
  
  // generate hashPassword from original password and salt
  let hashPass = await bcryptjs.hash(pass,salt);

  return hashPass;
}
// End

module.exports = async (req, res, next) => {
  try {
    const isUserExist = await User.findOne({
      email: req.body.email
    });
    if (isUserExist)
      res.status(403).send({
        msg: "User already exists",
        redirect: false
      });
    else {
      // Generate Encrypt Password
      req.body.password = await generateHashPassWord(req.body.password);
      // End 
      let createUser = await new User(req.body);
      const newUser = await createUser.save();
      req.body = newUser;
      next();
    }
      
  } catch (err) {
    res.status(403).json(err);
  }
}