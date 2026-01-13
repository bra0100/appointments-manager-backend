import { createClient, findAllClients, getClientById, updateClient as updateClientRepo, deleteClient as deleteClientRepo } from "../repositories/clients.repository.js";


export const getAllClients = async () => {
    return await findAllClients();
}

export const addClient = async (data) => {
    if (!data.name) {
        throw new Error('Name is required');
    }

    return await createClient(data.name, data.email, data.phone);
};

export const updateClient = async (id, data) => {
    return await updateClientRepo(
        id,
        data.name,
        data.email,
        data.phone
    );
};

export const deleteClient = async (id) => {
    return await deleteClientRepo(id);
};

export const getById = async (id) => {
    const client = await getClientById(id);
    if (!client) {
        throw new Error('Client not found');
    }
    return client;
};