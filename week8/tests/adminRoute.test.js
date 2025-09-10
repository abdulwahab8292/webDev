const request = require('supertest');
const express = require('express');
const { adminAuthentication } = require('../authentication/adminAuth');
const { adminRouter } = require('../routes/admin');
const jwt = require('jsonwebtoken');
const { SECRET_KEY_ADMIN } = require('../config');

const app = express();
app.use(express.json());
app.use('/api/v1/admin', adminAuthentication, adminRouter);

describe('Integration Test: /api/v1/admin', () => {
    it('should allow access with a valid token', async () => {
        const token = jwt.sign({ id: 'admin123' }, SECRET_KEY_ADMIN, { expiresIn: '1h' });

        const response = await request(app)
            .get('/api/v1/admin') // Replace with an actual admin route
            .set('token', token);

        expect(response.status).toBe(200); // Adjust based on your route's expected behavior
        expect(response.body).toHaveProperty('message'); // Adjust based on your route's response
    });

    it('should deny access with an invalid token', async () => {
        const response = await request(app)
            .get('/api/v1/admin') // Replace with an actual admin route
            .set('token', 'invalidToken');

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            message: 'Unauthorized Access'
        });
    });

    it('should deny access without a token', async () => {
        const response = await request(app)
            .get('/api/v1/admin'); // Replace with an actual admin route

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            message: 'Unauthorized Access'
        });
    });
});