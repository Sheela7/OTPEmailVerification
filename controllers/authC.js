const userModel = require('../models/user.js');
const optService = require("../services/otp.js");
const passwordHash = require("../services/password_hash.js");
const emailService = require("../services/email_service.js");

module.exports.signUpUser = async (req, res) => {
    //TODO: CHECK DATA EXISTENCE FROM DATABASE
    //TODO: GENERATE OTP
    //TODO: CREATE USER MODEL WITH DATABASE IN DATABASE

    // * Saving data 
    const userEmail = req.body.email;
    const userName = req.body.name;
    const userPassword = req.body.password;

    //Array to store errors list
    let errorsArray = [];

    //Validating req.body data
    if (userEmail == undefined) {
        errorsArray.push("Please provide email.");
    }
    if (userName == undefined) {
        errorsArray.push("Please provide name.");
    } if (userPassword == undefined) {
        errorsArray.push("Please provide password.");
    }

    if (errorsArray.length > 0) {
        throw errorsArray;
    } else {
        const doesEmailExists = await checkEmailExists(userEmail);
        if (doesEmailExists) {
            throw "Email already exists";
        }

        const doesUserNameExists = await checkUserNameExists(userName);
        if (doesUserNameExists) {
            throw "This name already exists";
        }
        const userData = await createUser(userEmail,userPassword,userName);
        res.json({ "status": "success", "message": "User created successfully", "data": userData });
    }
}

const checkEmailExists = async (userEmail) => {
    const userEmailData = await userModel.findOne({
        email: userEmail
    });
    if (userEmailData) {
        return true;
    } else {
        return false;
    }
}

const checkUserNameExists = async (userName) => {
    const userNameData = await userModel.findOne({
        name: userName
    });
    if (userNameData) {
        return true;
    }
    else {
        return false;
    }
}

const createUser = async (userEmail,userPassword,userName) => {
    //Generating OTP
    const userOtp = optService.generateOTP();
    //Generating hash password
    const hashedPassword = await passwordHash.hashPassword(userPassword);
    const userData = await userModel.create({
        email: userEmail,
        otp: userOtp,
        password: hashedPassword,
        name: userName
    });
    await emailService.sendOtpMail(userEmail, userOtp);
   return userData; 
}

module.exports.verifyEmail = (req, res) => {


}
