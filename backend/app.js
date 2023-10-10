const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { registerUser } = require('./controllers/registerController'); // Impordi kontroller
const mysql = require('mysql');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Registreerimismarsruut
app.post('/register', registerUser); // Kasutage registreerimiskontrollerit



// Ülejäänud Express.js seadistused ja marsruudid
// ...

// Kuulake serveri käivitamiseks määratud porti
app.listen(port, () => {
    console.log(`Server on käivitatud portil ${port}`);
});