import { Router } from 'express';
import {
    getAppointments,
    createAppointment,
    cancelAppointments,
    attendAppointments,
    rescheduleAppointments
} from '../controllers/appointments.controller.js';

const router = Router();

router.get('/', getAppointments);
router.post('/', createAppointment);
router.patch('/:id/cancel', cancelAppointments);
router.patch('/:id/attend', attendAppointments);
router.patch('/:id/reschedule', rescheduleAppointments);

export default router;