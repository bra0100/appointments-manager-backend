
import express from 'express';
import './db/database.js';

import clientsRoutes from './routes/clients.routes.js';
import servicesRouter from './routes/services.routes.js';
import appointmentsRoutes from './routes/appointments.routes.js';



const app = express();
const PORT = 3000;


app.use(express.json());

app.use('/clients', clientsRoutes);
app.use('/services', servicesRouter);
app.use('/appointments', appointmentsRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Appointments Management Backend' });
})

export default app;