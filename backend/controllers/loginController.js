const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = (req, res, dbConnection) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }

    const getUserQuery = 'SELECT * FROM users WHERE username = ?';
    dbConnection.query(getUserQuery, [username], (err, results) => {
        if (err) {
            console.error('Error in login query:', err);
            return res.status(500).json({ error: 'Login failed' });
        }

        if (results.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (bcryptErr, passwordMatch) => {
            if (bcryptErr || !passwordMatch) {
                console.error('Incorrect password');
                return res.status(400).json({ error: 'Incorrect password' });
            }

            const token = jwt.sign({ userId: user.user_id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });

            res.json({ token });
        });
    });
};
