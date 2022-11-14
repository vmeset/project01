require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Note = require('./models/noteModel')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000
const DB = process.env.DB_URL

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use(errorHandler)

async function startApp() {
    try {
        await mongoose.connect(DB, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log(`port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

startApp()