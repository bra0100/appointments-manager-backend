import request from 'supertest';
import app from '../src/app.js';

describe('Appointments - Double Booking Prevention', () => {

    test(
        'Should not allow double booking for same service, date and time',
        async () => {
            const clientRes = await request(app)
                .post('/clients')
                .send({ name: 'Test Client' });

            const clientId = clientRes.body.id;

            const serviceRes = await request(app)
                .post('/services')
                .send({ name: 'Test Service', price: 100 });

            const serviceId = serviceRes.body.id;

            const appointmentData = {
                clientId,
                serviceId,
                date: '2099-12-31',
                time: '10:00'
            };

            const firstAppointmentRes = await request(app)
                .post('/appointments')
                .send(appointmentData);

            expect(firstAppointmentRes.status).toBe(201);

            const secondAppointmentRes = await request(app)
                .post('/appointments')
                .send(appointmentData);

            expect(secondAppointmentRes.status).toBe(400);
            expect(secondAppointmentRes.body.error).toBeDefined();
        });

});