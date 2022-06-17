const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const helmet = require('helmet')

const mongoConfig = require('./config/mongoConfig')
const blogRouter = require('./routes/blogRouter')
const usersRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')


const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())

app.use('/blogs', blogRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)

app.get('/', (req,res) => {
    res.status(200).json({message: 'How are you feeling today?'})
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
    mongoConfig()
})