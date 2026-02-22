import { Router } from "express";
import {
  createHistorial,
  getAllHistorial,
  getHistorialByMascota,
  updateHistorial,
  deleteHistorial,
} from "../controllers/historial.controller";

import { validateFields } from "../middlewares/validate.middleware";
import { createHistorialValidator } from "../validators/historial.validator";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticateToken);
router.use(authorizeRoles("admin", "veterinario"));

router.post("/", createHistorialValidator, validateFields, createHistorial);
router.get("/", getAllHistorial);
router.get("/mascota/:mascota_id", getHistorialByMascota);
router.patch("/:id", createHistorialValidator, validateFields, updateHistorial);
router.delete("/:id", deleteHistorial);

export default router;
