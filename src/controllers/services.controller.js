import * as serviceServices from '../services/service.service.js';

export const getAllServices = async (req, res) => {
    const services = await serviceServices.getAllServices();
    res.json(services);
}

export const addService = async (req, res) => {
    try {
        const newService = await serviceServices.addService(req.body);
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const updateService = (req, res) => {
    try {
        const updateService = serviceServices.updateService(req.params.id, req.body);
        res.json(updateService);
    } catch (error) {
        res.status(404).json({ errpr: error.message });
    }
};

export const deleteService = (req, res) => {
    try {
        const deleteService = serviceServices.deleteService(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};