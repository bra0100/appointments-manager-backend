let service = [];
let nextId = 1;

export const getAllServices = () => {
    return service;
}

export const addService = (data) => {
    if (!data.name) {
        throw new Error('Name is required');
    }
    const newService = {
        id: nextId++,
        name: data.name,
        description: data.description || null,
        price: data.price || 0,
        active: true
    }

    service.push(newService);
    return newService;
}

export const updateService = (id, data) => {
    const svc = service.find(s => s.id === Number(id));

    if (!svc) {
        throw new Error('Service not found');
    }

    svc.name = data.name ?? svc.name;
    svc.description = data.description ?? svc.description;
    svc.price = data.price ?? svc.price;

    return svc;
}

export const deleteService = (id) => {
    const svc = service.find(s => s.id === Number(id));

    if (!svc) {
        throw new Error('Service not found');
    }

    svc.active = false;
}

