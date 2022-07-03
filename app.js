require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const Routes = require('./routes/authRoutes.js')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
  })
const PORT = process.env.PORT || 3000;

app.use('/', Routes)
//you can directly import and use routes like this
//app.use('/', require('../routes/router'));



app.listen(PORT, () => {
    console.log('Sever started at PORT', PORT);
  });


