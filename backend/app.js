const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');
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

// Registreerimismarsruut
app.post('/api/register', (req, res) => {
    registerUser(req, res, dbConnection);
});
app.post('/api/login', (req, res) => {
    loginUser(req, res, dbConnection);
});
app.listen(port, () => {
    console.log(`Server on käivitatud portil ${port}`);
});
