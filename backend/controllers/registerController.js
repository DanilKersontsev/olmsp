const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Ülejäänud impordid jäävad samaks

// Registreerimine
exports.registerUser = (req, res, dbConnection) => {
    const { username, email, password } = req.body;

    // Valideerige andmed kasutades Express Validatorit
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Kontrollige, kas kasutajanimi on juba olemas
    const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
    dbConnection.query(checkUsernameQuery, [username], (checkUserErr, checkUserResults) => {
        if (checkUserErr) {
            console.error('Kasutajanime kontroll ebaõnnestus: ', checkUserErr);
            return res.status(500).json({ error: 'Kasutajanime kontroll ebaõnnestus' });
        }

        if (checkUserResults.length > 0) {
            return res.status(400).json({ error: 'Kasutajanimi on juba kasutusel' });
        }

        // Kontrollige, kas kasutaja on juba olemas e-posti järgi
        const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
        dbConnection.query(checkUserQuery, [email], (checkErr, checkResults) => {
            if (checkErr) {
                console.error('Andmete kontrollimine ebaõnnestus: ', checkErr);
                return res.status(500).json({ error: 'Andmete kontrollimine ebaõnnestus' });
            }

            if (checkResults.length > 0) {
                return res.status(400).json({ error: 'Kasutaja on juba registreeritud' });
            }

            // Krüpti parool enne salvestamist
            bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
                if (hashErr) {
                    console.error('Parooli krüptimine ebaõnnestus: ', hashErr);
                    return res.status(500).json({ error: 'Parooli krüptimine ebaõnnestus' });
                }

                // Looge uus kasutaja ja salvestage see kasutajate tabelisse
                const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
                dbConnection.query(insertUserQuery, [username, email, hashedPassword], (insertErr) => {
                    if (insertErr) {
                        console.error('Andmete lisamine ebaõnnestus: ', insertErr);
                        return res.status(500).json({ error: 'Andmete lisamine ebaõnnestus' });
                    }

                    return res.status(201).json({ message: 'Registreerimine õnnestus' });
                });
            });
        });
    });
};

