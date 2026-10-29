import express from "express";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import Signup from './models/signup.js'; // Adjust the path as necessary

const app = express()

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase').then(() => {
    console.log('Connected to MongoDB');
})

// Define a simple route
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    const { username, password } = req.body
    const hashPassword = await bcrypt.hash(password, 10)

    await Signup.create({ username, password: hashPassword })
    res.redirect('/login');

})

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {

})


// server
app.listen(3000, () => {
    console.log('App listening on port 3000!');
});