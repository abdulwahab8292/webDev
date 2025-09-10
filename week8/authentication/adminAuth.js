const { SECRET_KEY_ADMIN } = require('../config');
const jwt = require('jsonwebtoken');

function adminAuthentication(req, res, next) {
    const token = req.headers["token"];
    try {
        const decodedData = jwt.verify(token, SECRET_KEY_ADMIN);
        req.adminId = decodedData.id;
        next(); 
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized Access"
        });
    }
}

module.exports = {
    adminAuthentication: adminAuthentication
};
