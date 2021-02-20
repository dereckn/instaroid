const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

const DB = process.env.MONGO_DB
const PORT = 5000

require('./models/user')

app.use(express.json())
app.use(require('./routes/auth'))

// DB
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,useFindAndModify: false,
    useCreateIndex: true
})
mongoose.connection.on('connected', ()=>{
    console.log("connected to DB")
})
mongoose.connection.on('error', (error)=>{
    console.log("error connecting to db ", error)
})
const customMiddleware = (req, res, next) => {
    console.log("middleware executed.")
    next()
}

app.listen(PORT, ()=>{
    console.log("server is running on: ", + PORT)
})
