import { createClient, findAllClients, getClientById } from "../repositories/clients.repository.js";


export const getAllClients = async () => {
    return await findAllClients();
}

export const addClient = async (data) => {
    if (!data.name) {
        throw new Error('Name is required');
    }

    return await createClient(data.name);
};

export const updateClient = (id, data) => {
    const client = clients.find(c => c.id === Number(id));
    if (!client) {
        throw new Error('Client not found');
    }

    client.name = data.name ?? client.name;
    client.email = data.email ?? client.email;
    client.phone = data.phone ?? client.phone;

    return client;
};

export const deleteClient = (id) => {
    const client = clients.find(c => c.id === Number(id));
    if (!client) {
        throw new Error('Client not found');
    }

    client.active = false;
};

export const getById = async (id) => {
    const client = await getClientById(id);
    if (!client) {
        throw new Error('Client not found');
    }
    return client;
};