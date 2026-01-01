import { getAllClients } from '../services/client.service.js';
import { getAllServices } from '../services/service.service.js';
import { APPOINTMENT_STATUS } from '../constants/appointmentStatus.js';

let appointments = [];
let nextId = 1;

export const getAllAppointments = () => {
    return appointments;
}

export const addAppointment = (data) => {
    if (!data.clientId) throw new Error('Client ID is required');
    if (!data.serviceId) throw new Error('Service ID is required');
    if (!data.date) throw new Error('Date is required');
    if (!data.time) throw new Error('Time is required');

    const client = getAllClients().find(c => c.id === Number(data.clientId) && c.active);
    if (!client) throw new Error('Client not found or inactive');

    const service = getAllServices().find(s => s.id === Number(data.serviceId) && s.active);
    if (!service) throw new Error('Service not found or inactive');

    const appointmentExists = appointments.some(a => {
        a.serviceId === Number(data.serviceId) &&
            a.date === data.date &&
            a.time === data.time
    })

    if (appointmentExists) throw new Error('Appointment already exists for this client');

    const newAppointment = {
        id: nextId++,
        clientId: Number(data.clientId),
        serviceId: Number(data.serviceId),
        date: data.date,
        time: data.time,
        status: APPOINTMENT_STATUS.PENDING
    };

    appointments.push(newAppointment);
    return newAppointment;
};

export const cancelAppointment = (id) => {
    const appointment = appointments.find(a => a.id === Number(id));
    if (!appointment) throw new Error('Appointment not found');
    if (appointment.status !== APPOINTMENT_STATUS.PENDING) throw new Error('Only pending appointments can be cancelled');

    appointment.status = APPOINTMENT_STATUS.CANCELLED;
    return appointment;
}

export const attendedAppointment = (id) => {
    const appointment = appointments.find(a => a.id === Number(id));

    if (!appointment) throw new Error('Appointment not found');
    if (appointment.status !== APPOINTMENT_STATUS.PENDING) throw new Error('Only pending appointments can be completed');

    appointment.status = APPOINTMENT_STATUS.ATTENDED;
    return appointment;
};

export const rescheduleAppointment = (id, newDate, newTime) => {
    const appointment = appointments.find(a => a.id === Number(id));
    if (!appointment) throw new Error('Appointment not found');
    if (appointment.status !== APPOINTMENT_STATUS.PENDING) throw new Error('Only pending appointments can be rescheduled');
    if (!newDate) throw new Error('New date is required');
    if (!newTime) throw new Error('New time is required');

    const conflict = appointments.some(a => {
        a.id !== appointment.id &&
            a.serviceId === appointment.serviceId &&
            a.date === newDate &&
            a.time === newTime
    });

    if (conflict) throw new Error('Another appointment exists for this service at the new date and time');

    appointment.date = newDate;
    appointment.time = newTime;
    return appointment;
}

export const getAppointmentsByStatus = (status) => {
    const validStatuses = Object.values(APPOINTMENT_STATUS);

    if (!validStatuses.includes(status)) {
        throw new Error('Invalid appointment status');
    }

    return appointments.filter(a => a.status === status);
}