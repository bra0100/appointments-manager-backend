import * as clientService from '../services/client.service.js';

export const getClients = (req, res) => {
    const clients = clientService.getAllClients();
    res.json(clients);
};

export const createClient = (req, res) => {
    try {
        const newClient = clientService.addClient(req.body);
        res.status(201).json(newClient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateClient = (req, res) => {
    try {
        const updatedClient = clientService.updateClient(req.params.id, req.body);
        res.json(updatedClient);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const deleteClient = (req, res) => {
    try {
        clientService.deleteClient(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};