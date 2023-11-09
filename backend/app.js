const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
dotenv.config();

const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const { registerUser } = require('./controllers/registerController');
const { loginUser } = require('./controllers/loginController');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000,
    },
}));

// Registreerimisruut
app.post('/api/register', (req, res) => {
    registerUser(req, res, dbConnection);
});

// Sisselogimisruut
app.post('/api/login', (req, res) => {
    loginUser(req, res, dbConnection);
});

// Väljalogimisruut
app.get('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.clearCookie('connect.sid');
        res.send('Logged out');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
