const express = require('express');
const dotenv = require('dotenv').config()
const dbConnect = require('./config.js/db')
const port = process.env.PORT || 5000
const {errorHandler} = require('./Middleware/errorMiddleware')
const app = express()

dbConnect();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/goals',require('./routes/goals'))
app.use(errorHandler)

app.listen(port, () => console.log(`server runing on port ${port}`))