const { generateOTP } = require('../services/OTP'); 
const { sendMail } = require('../services/MAIL');
const  model = require('../models/user.js');


module.exports.signUpUser = async (req, res) =>
   {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const isExisting = await findUserByEmail(email);
  if (isExisting) {
    return res.send('Already existing');
  }else{
    const newUser = await model.create({
    email,
    password: password,
    otp: 123,
  });
  console.log("THe user data is ",newUser);
  }
};

module.exports.verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  const user = await validateUserSignUp(email, otp);
  res.send(user);
};

const findUserByEmail = async (email) => {
  const user = await model.findOne({
    email,
  });
  if (!user) {
    return false;
  }
  return user;
};

const createUser = async (email, password) => {
  const hashedPassword = await encrypt(password);
  const otpGenerated = generateOTP();
  const newUser = await model.create({
    email,
    password: hashedPassword,
    otp: otpGenerated,
  });
  if (!newUser) {
    return [false, 'Unable to sign you up'];
  }
  try {
    await sendMail({
      to: email,
      OTP: otpGenerated,
    });
  return [true, newUser];
} catch (error) {
  return [false, 'Unable to sign up, Please try again later', error];
}
};

const validateUserSignUp = async (email, otp) => {
  const user = await model.findOne({
    email,
  });
  if (!user) {
    return [false, 'User not found'];
  }
  if (user && user.otp !== otp) {
    return [false, 'Invalid OTP'];
  }
  const updatedUser = await model.findByIdAndUpdate(user._id, {
    $set: { active: true },
  });
  return [true, updatedUser];
};