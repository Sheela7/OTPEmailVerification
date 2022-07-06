    const userModel = require('../models/user.js');

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
            const userData = userModel.findOne({
                email:userEmail
            });
            //
            if(userData !=undefined){
                throw "User already exists";j
            }
            
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
