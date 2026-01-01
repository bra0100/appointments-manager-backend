import { Router } from "express";
import { getAllServices, addService, updateService, deleteService } from "../controllers/services.controller.js";

const router = Router();

router.get('/', getAllServices);
router.post('/', addService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;