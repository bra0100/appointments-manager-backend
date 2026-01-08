import {
    createAppointment as createAppointmentRepo,
    findAppointmentById,
    findAllAppointments,
    isAppointmentTaken,
    updateAppointment
} from '../repositories/appointments.repository.js';

import { getClientById } from '../repositories/clients.repository.js';
import { getServiceById } from '../repositories/service.repository.js';
import { APPOINTMENT_STATUS } from '../constants/appointmentStatus.js';


export const getAllAppointments = async (status) => {
    const appointments = await findAllAppointments();
    if (!status) return appointments;

    if (!Object.values(APPOINTMENT_STATUS).includes(status)) {
        throw new Error('Invalid appointment status');
    }
    return appointments.filter(a => a.status === status);
}

const validateTimeSlot = async (serviceId, date, time) => {
    const isTaken = await isAppointmentTaken(serviceId, date, time);
    if (isTaken) {
        throw new Error('The selected time slot is already taken for this service');
    }
};

const validateFutureDate = (date, time) => {
    const appointmentDateTime = new Date(`${date}T${time}:00`);
    const now = new Date();

    if (appointmentDateTime <= now) {
        throw new Error('Appointment date and time must be in the future');
    }
};

export const addAppointment = async (data) => {
    const { clientId, serviceId, date, time } = data;

    if (!clientId) throw new Error('Client ID is required');
    if (!serviceId) throw new Error('Service ID is required');
    if (!date) throw new Error('Date is required');
    if (!time) throw new Error('Time is required');

    const client = await getClientById(clientId);
    if (!client) throw new Error('Client not found or inactive');

    const service = await getServiceById(serviceId);
    if (!service || !service.active) throw new Error('Service not found or inactive');

    validateFutureDate(date, time);

    await validateTimeSlot(serviceId, date, time);

    return await createAppointmentRepo({
        clientId,
        serviceId,
        date,
        time
    });
}

export const cancelAppointment = async (id) => {
    const appointment = await findAppointmentById(id);
    if (!appointment) throw new Error('Appointment not found');
    if (appointment.status !== APPOINTMENT_STATUS.PENDING)
        throw new Error('Only pending appointments can be cancelled');

    await updateAppointment(id, { status: APPOINTMENT_STATUS.CANCELLED });
    return { message: 'Appointment cancelled successfully' };
}

export const attendedAppointment = async (id) => {
    const appointment = await findAppointmentById(id);

    if (!appointment) throw new Error('Appointment not found');
    if (appointment.status !== APPOINTMENT_STATUS.PENDING) throw new Error('Only pending appointments can be completed');

    await updateAppointment(id, { status: APPOINTMENT_STATUS.ATTENDED });
    return { message: 'Appointment marked as attended successfully' };
};

export const rescheduleAppointment = async (id, date, time) => {
    const appointment = await findAppointmentById(id);

    if (!appointment) throw new Error('Appointment not found');
    if (appointment.status !== APPOINTMENT_STATUS.PENDING) throw new Error('Only pending appointments can be rescheduled');
    if (!date) throw new Error('New date is required');
    if (!time) throw new Error('New time is required');
    validateFutureDate(date, time);

    await validateTimeSlot(appointment.serviceId, date, time);

    await updateAppointment(id, { date, time });
    return { message: 'Appointment rescheduled successfully' };
}

