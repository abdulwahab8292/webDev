const { adminAuthentication } = require('../authentication/adminAuth');
const { SECRET_KEY_ADMIN } = require('../config');
const jwt = require('jsonwebtoken');

describe('adminAuthentication Middleware', () => {
    it('should call next() if the token is valid', () => {
        const mockReq = {
            headers: {
                token: jwt.sign({ id: 'admin123' }, SECRET_KEY_ADMIN, { expiresIn: '1h' })
            }
        };
        const mockRes = {};
        const mockNext = jest.fn();

        adminAuthentication(mockReq, mockRes, mockNext);

        expect(mockReq.adminId).toBe('admin123');
        expect(mockNext).toHaveBeenCalled();
    });

    it('should return 401 if the token is invalid', () => {
        const mockReq = {
            headers: {
                token: 'invalidToken'
            }
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const mockNext = jest.fn();

        adminAuthentication(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'Unauthorized Access'
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 401 if no token is provided', () => {
        const mockReq = {
            headers: {}
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const mockNext = jest.fn();

        adminAuthentication(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'Unauthorized Access'
        });
        expect(mockNext).not.toHaveBeenCalled();
    });
});