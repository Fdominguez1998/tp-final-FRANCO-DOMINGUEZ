import { Router } from "express";
import {
  createHistorial,
  getAllHistorial,
  getHistorialByMascota,
} from "../controllers/historial.controller";

import { validateFields } from "../middlewares/validate.middleware"; // ← NUEVO
import { createHistorialValidator } from "../validators/historial.validator"; // ← NUEVO
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticateToken);
router.use(authorizeRoles("admin", "veterinario"));

router.post("/", createHistorialValidator, validateFields, createHistorial); // ← MODIFICADO
router.get("/", getAllHistorial);
router.get("/mascota/:mascota_id", getHistorialByMascota);

export default router;