const express = require('express')
const registerRoute = require('./routes/details')
const app =express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
const dotenv = require('dotenv')
dotenv.config()


//db connection
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL, console.log('connected to db'))

app.use(registerRoute)


app.listen(5000, (console.log("connected")))