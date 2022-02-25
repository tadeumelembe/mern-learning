const express = require('express');
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const cors = require("cors")
const app = express()

const dbConnect = require('./config.js/db')
const {errorHandler} = require('./Middleware/errorMiddleware')
const corsOptions = require('./Middleware/corsMiddleware')
dbConnect();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/goals',require('./routes/goalRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.use(errorHandler)
app.use(cors(corsOptions))
app.listen(port, () => console.log(`server runing on port ${port}`))