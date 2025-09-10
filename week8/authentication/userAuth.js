const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config');

function userAuthentication(req, res, next) {
    const token = req.headers["token"];
    try {
        const decodedData = jwt.verify(token, JWT_KEY);
        req.userId = decodedData.id;
        next(); 
    } catch (error) {
        res.status(401).json({
            message: 'Unauthenticated'
        });
    }
}

module.exports = {
    userAuthentication: userAuthentication
};
