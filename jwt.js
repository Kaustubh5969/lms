const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtAuthMiddleware = (req, res, next) => {

    const authorization = req.headers.authorization
    if (!authorization) return res.status(401).json({ error: 'Token not found' });


    const token = req.headers.authorization;
    if (!token) return res.this.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
}

const generateToken = (userData) => {
    return jwt.sign({ userData }, process.env.JWT_SECRET);
}

module.exports = { jwtAuthMiddleware, generateToken }