import {
    addAppointment,
    getAllAppointments,
    cancelAppointment,
    rescheduleAppointment,
    attendedAppointment
} from '../services/appointment.service.js';



export const getAppointments = async (req, res) => {
    try {
        const { status } = req.query;
        const appointments = await getAllAppointments(status);
        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const createAppointment = async (req, res) => {
    try {
        const newAppointment = await addAppointment(req.body);
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const cancelAppointments = async (req, res) => {
    try {
        const canceledAppointment = await cancelAppointment(req.params.id);
        res.status(200).json(canceledAppointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const attendAppointments = async (req, res) => {
    try {
        const attAppointment = await attendedAppointment(req.params.id);
        res.status(200).json(attAppointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const rescheduleAppointments = async (req, res) => {
    try {
        const { date, time } = req.body;
        const appointment = await rescheduleAppointment(req.params.id, date, time);
        res.status(200).json(appointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

