import request from 'supertest';
import app from '../src/app.js';

describe('Appointments - Final Status', () => {
    test('should not allow rescheduling an attended appointment', async () => {
        const clientRes = await request(app)
            .post('/clients')
            .send({
                name: 'Final Status Client'
            });

        const clientId = clientRes.body.id;

        const serviceRes = await request(app)
            .post('/services')
            .send({
                name: 'Final Status Service',
                price: 150
            });

        const serviceId = serviceRes.body.id;

        const appointmentRes = await request(app)
            .post('/appointments')
            .send({
                clientId,
                serviceId,
                date: '2029-11-30',
                time: '11:00'
            });

        const appointmentId = appointmentRes.body.id;

        expect(appointmentRes.status).toBe(201);

        const attendRes = await request(app)
            .patch(`/appointments/${appointmentId}/attend`)

        expect(attendRes.status).toBe(200);

        const rescheduleRes = await request(app)
            .patch(`/appointments/${appointmentId}/reschedule`)
            .send({
                date: '2099-12-01',
                time: '12:00'
            });

        expect(rescheduleRes.status).toBe(400);
        expect(rescheduleRes.body.error).toBeDefined();
    });
});