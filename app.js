require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/authRoutes.js')
//Express application 
const app = express()
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
  });
const PORT = process.env.PORT || 3000;

app.use('/auth', authRoute)

app.listen(PORT, () => {
    console.log('Sever started at PORT', PORT);
  });


