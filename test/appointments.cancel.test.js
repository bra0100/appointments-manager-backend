import request from 'supertest';
import app from '../src/app.js';

describe('Appointments - Cancel Functionality', () => {
    test('should successfully cancel a pending appointment', async () => {
        const clientRes = await request(app)
            .post('/clients')
            .send({
                name: 'Cancel Test Client'
            });

        const clientId = clientRes.body.id;

        const serviceRes = await request(app)
            .post('/services')
            .send({
                name: 'Cancel Test Service',
                price: 200
            });

        const serviceId = serviceRes.body.id;

        const appointmentRes = await request(app)
            .post('/appointments')
            .send({
                clientId,
                serviceId,
                date: '2029-12-15',
                time: '14:00'
            });

        const appointmentId = appointmentRes.body.id;
        expect(appointmentRes.status).toBe(201);
        expect(appointmentRes.body.status).toBe('pending');

        const cancelRes = await request(app)
            .patch(`/appointments/${appointmentId}/cancel`);

        expect(cancelRes.status).toBe(200);
        expect(cancelRes.body.message).toBe('Appointment canceled successfully');
    });

    test('should not allow canceling a non-pending appointment', async () => {
        const clientRes = await request(app)
            .post('/clients')
            .send({
                name: 'No Cancel Client'
            });

        const clientId = clientRes.body.id;

        const serviceRes = await request(app)
            .post('/services')
            .send({
                name: 'No Cancel Service',
                price: 100
            });

        const serviceId = serviceRes.body.id;

        const appointmentRes = await request(app)
            .post('/appointments')
            .send({
                clientId,
                serviceId,
                date: '2029-12-16',
                time: '15:00'
            });

        const appointmentId = appointmentRes.body.id;

        await request(app)
            .patch(`/appointments/${appointmentId}/attend`);

        const cancelRes = await request(app)
            .patch(`/appointments/${appointmentId}/cancel`);

        expect(cancelRes.status).toBe(400);
        expect(cancelRes.body.error).toBe('Only pending appointments can be canceled');
    });
});
