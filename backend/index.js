const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')


const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')
const postRouter = require('./routes/postRouter')
const commentRouter = require('./routes/commentRouter')
const uploadRouter = require('./routes/uploadRouter')
const app = express()


app.get('/', (req, res) => res.send('UniVerse API'));

// Connect to MongoDB
mongoose.connect( process.env.MONGO_URL, {
  useNewUrlParser: true
});

// Check the database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});


app.use('/images', express.static('public/images'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/comment', commentRouter)
app.use('/upload', uploadRouter)



// connect backend app
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server is connected succesfully"));