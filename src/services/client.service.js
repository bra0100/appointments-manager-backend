let clients = [];
let nextId = 1;

export const getAllClients = () => {
    return clients;
}

export const addClient = (data) => {
    if (!data.name) {
        throw new Error('Name is required');
    }

    const newClient = {
        id: nextId++,
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
        active: true
    };

    clients.push(newClient);
    return newClient;
};

export const updateClient = (id, data) => {
    const client = clients.find(c => c.id === Number(id));
    if (!client) {
        throw new Error('Client not found');
    }

    client.name = data.name || client.name;
    client.email = data.email || client.email;
    client.phone = data.phone || client.phone;

    return client;
};

export const deleteClient = (id) => {
    const client = clients.find(c => c.id === Number(id));
    if (!client) {
        throw new Error('Client not found');
    }

    client.active = false;
};