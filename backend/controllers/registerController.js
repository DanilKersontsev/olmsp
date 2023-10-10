
const mysql = require('mysql');
const dotenv = require("dotenv");
dotenv.config();
// MySQL andmebaasi ühendus
const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

// Registreerimine
exports.registerUser = (req, res) => {
    const { username, email, password } = req.body;

    // Kui mingeid andmeid pole saadetud või need on puudulikud
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Palun täitke kõik väljad' });
    }

    // Kontrollige, kas kasutaja on juba olemas
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    dbConnection.query(checkUserQuery, [email], (checkErr, checkResults) => {
        if (checkErr) {
            console.error('Andmete kontrollimine ebaõnnestus: ', checkErr);
            return res.status(500).json({ error: 'Andmete kontrollimine ebaõnnestus' });
        }

        if (checkResults.length > 0) {
            return res.status(400).json({ error: 'Kasutaja on juba registreeritud' });
        }

        // Looge uus kasutaja ja salvestage see kasutajate tabelisse
        const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        dbConnection.query(insertUserQuery, [username, email, password], (insertErr) => {
            if (insertErr) {
                console.error('Andmete lisamine ebaõnnestus: ', insertErr);
                return res.status(500).json({ error: 'Andmete lisamine ebaõnnestus' });
            }

            return res.status(201).json({ message: 'Registreerimine õnnestus' });
        });
    });
};
