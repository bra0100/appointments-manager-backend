import { createService, findAllServices, getServiceById } from "../repositories/service.repository.js";

export const getAllServices = async () => {
    return await findAllServices();
}

export const addService = async (data) => {
    if (!data.name) {
        throw new Error('Name is required');
    }
    const price = Number(data.price ?? 0);

    if (price < 0) {
        throw new Error('Price must be a non-negative number');
    }

    return await createService({
        name: data.name,
        description: data.description ?? "",
        price: price
    });
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

export const getById = async (id) => {
    const svc = await getServiceById(id);
    if (!svc) {
        throw new Error('Service not found');
    }
    return svc;
}