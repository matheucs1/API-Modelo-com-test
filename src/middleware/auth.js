const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token inválido ou não fornecido' });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido ou não fornecido.' });
        }

        req.session = decoded;
        next();
    })
}

module.exports = authMiddleware;