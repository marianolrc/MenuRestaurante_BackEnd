const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if(user.rol === 'admin') {
            const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h'});


            res.json({ userState: user.rol, token });
        } else {
            res.status(200).json({ userState: user.rol });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    login
}