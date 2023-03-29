const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token!');
    }
}

function authorizeAdmin(req, res, next) {
    if (req.user.user.user_is_admin !== 1) {
        return res.status(403).send({ error: 'Unauthorized: Not an admin' });
    }
    next();
}

module.exports = {
    authenticateUser,
    authorizeAdmin,
};