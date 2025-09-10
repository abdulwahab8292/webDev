require('dotenv').config();

const JWT_KEY = process.env.JWT_USER_PSWD;
const SECRET_KEY_ADMIN = process.env.JWT_ADMIN_PSWD;

module.exports = {
    JWT_KEY,
    SECRET_KEY_ADMIN
};
