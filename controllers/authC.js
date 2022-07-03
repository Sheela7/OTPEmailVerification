    const userModel = require('../models/user.js');

    module.exports.signUpUser = async (req,res) => {
        // console.log("The request.body is :" ,req.body)
        const userEmail = req.body.email
        const userName = req.body.name
        const userPassword = req.body.password
        

        
        //Checking if the username exists or not database ma vako ra req.body bata ako data equal xa ki xaena data liney
        const data = userModel.findOne({name: userName})
    // const userData= await userModel.create({
    //         name:userName,
    //         email:userEmail,z
    //         password:userPassword,
    //         otp:3456
    //     })

        res.json({"status":"user created","data":userData})
    }

    module.exports.verifyEmail = (req,res) => {

    }
