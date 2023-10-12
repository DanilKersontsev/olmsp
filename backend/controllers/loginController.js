const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'qwerty';
// Sisselogimine
exports.loginUser = (req, res, dbConnection) => {
    const { username, password } = req.body;

    // Andmete kontrollimine
    if (!username || !password) {
        return res.status(400).json({ error: 'Palun täitke kõik väljad' });
    }

    // Kontrollige, kas kasutaja on olemas
    const getUserQuery = 'SELECT * FROM users WHERE username = ?';
    dbConnection.query(getUserQuery, [username], (err, results) => {
        if (err) {
            console.error('Andmete kontrollimine ebaõnnestus: ', err);
            return res.status(500).json({ error: 'Andmete kontrollimine ebaõnnestus' });
        }

        if (results.length === 0) {
            return res.status(400).json({ error: 'Kasutaja ei eksisteeri' });
        }

        const user = results[0];

        // Kontrolli parooli
        bcrypt.compare(password, user.password, (bcryptErr, passwordMatch) => {
            if (bcryptErr || !passwordMatch) {
                return res.status(400).json({ error: 'Vale parool' });
            }

            // Loo JWT token
            const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
            const decodedToken = jwt.verify(token, secretKey);

            res.status(200).json({ token });
        });
    });
};
