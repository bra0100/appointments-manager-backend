
import express from 'express';
import clientsRoutes from './routes/clients.routes.js';
import servicesRouter from './routes/services.routes.js';


const app = express();
const PORT = 3000;


app.use(express.json());
app.use('/clients', clientsRoutes);
app.use('/services', servicesRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Appointments Management Backend' });
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})
