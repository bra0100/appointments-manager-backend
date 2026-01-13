import { createService, findAllServices, getServiceById, updateService as updateServiceRepo, deleteService as deleteServiceRepo } from "../repositories/service.repository.js";

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

export const updateService = async (id, data) => {
    return await updateServiceRepo(
        id,
        data.name,
        data.description,
        data.price
    );
}

export const deleteService = async (id) => {
    return await deleteServiceRepo(id);
}

export const getById = async (id) => {
    const svc = await getServiceById(id);
    if (!svc) {
        throw new Error('Service not found');
    }
    return svc;
}