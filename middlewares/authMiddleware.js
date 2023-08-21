const jwt = require('jsonwebtoken');
const cookie = require('cookie');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
    const cookieHeader = req.headers['cookie'];

    //console.log(cookieHeader);

    if(cookieHeader) {
        const cookies = cookie.parse(cookieHeader);
        const token = cookies['token'];

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        jwt.verify(token, secretKey, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid Token' });
            }
            req.userId = decodedToken.userId;
            next();
        });
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = authMiddleware;