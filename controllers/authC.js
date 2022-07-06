    const userModel = require('../models/user.js');
    const optService = require("../services/otp.js");

    module.exports.signUpUser = async (req,res) => {
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
        if(userEmail == undefined){
            errorsArray.push("Please provide email.");
        }
        if(userName == undefined ){
            errorsArray.push("Please provide name.");
        }if(userPassword == undefined ){
            errorsArray.push("Please provide password.");
        }

        if(errorsArray.length > 0){
            throw errorsArray;
        }else{
            const userEmailData =await userModel.findOne({
                email:userEmail
            });
            console.log(userEmailData) ;
            if(userEmailData){
                throw "This email already exists";
            }

            const userNameData =await userModel.findOne({
                name:userName
            })

            if(userNameData!=undefined){
                throw "This name already exists";
            }
            
            //Generating OTP
            const userOtp = optService.generateOTP();

            const userData = await userModel.create({
                email: userEmail,
                otp:userOtp,
                password: userPassword,
                name: userName
            });
            console.log(`The user data is ${userData}`);
            res.json({"status":"success","message":"User created successfully","data":userData});
        }
        //Checking if the username exists or not database ma vako ra req.body bata ako data equal xa ki xaena data liney
        // const data = userModel.findOne({name: userName})
    // const userData= await userModel.create({
    //         name:userName,
    //         email:userEmail,z
    //         password:userPassword,
    //         otp:3456
    //     })

        // res.json({"status":"user created","data":userData})
    }

    module.exports.verifyEmail = (req,res) => {
        

    }
