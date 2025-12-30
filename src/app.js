
import express from 'express';
import clientsRoutes from './routes/clients.routes.js';


const app = express();
const PORT = 3000;


app.use(express.json());
app.use('/clients', clientsRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Gestor de Turnos Backend' });
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})