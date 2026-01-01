import * as appointmentService from "../services/appointment.service.js";

export const createAppointment = (req, res) => {
    try {
        const newAppointment = appointmentService.addAppointment(req.body);
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAppointments = (req, res) => {
    try {
        res.status(200).json(appointmentService.getAllAppointments());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const cancelAppointment = (req, res) => {
    try {
        const cancelledAppointment = appointmentService.cancelAppointment(req.params.id);
        res.status(200).json(cancelledAppointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const attendAppointment = (req, res) => {
    try {
        const attendedAppointment = appointmentService.attendedAppointment(req.params.id);
        res.status(200).json(attendedAppointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const rescheduleAppointment = (req, res) => {
    try {
        const { date, time } = req.body;
        const appointment = appointmentService.rescheduleAppointment(req.params.id, date, time);
        res.status(200).json(appointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

