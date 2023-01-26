const jwt = require('jsonwebtoken');

module.exports.auth = auth;

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token)
        return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log({ decoded, token });
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).send('Invalid token.');
    }
}
