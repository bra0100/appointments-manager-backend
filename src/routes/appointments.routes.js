import { Router } from 'express';
import {
    createAppointment,
    getAppointments,
    cancelAppointment,
    attendAppointment,
    rescheduleAppointment
} from '../controllers/appointments.controller.js';

const router = Router();

router.get('/', getAppointments);
router.post('/', createAppointment);
router.patch('/:id/cancel', cancelAppointment);
router.patch('/:id/attend', attendAppointment);
router.patch('/:id/reschedule', rescheduleAppointment);

export default router;