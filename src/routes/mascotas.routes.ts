import { Router } from "express";
import {
  createMascota,
  getAllMascotas,
  getMascotaById,
} from "../controllers/mascotas.controller";

import { validateFields } from "../middlewares/validate.middleware"; // ← NUEVO
import { createMascotaValidator } from "../validators/mascotas.validator"; // ← NUEVO
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticateToken);
router.use(authorizeRoles("admin", "veterinario"));

router.post("/", createMascotaValidator, validateFields, createMascota); // ← MODIFICADO
router.get("/", getAllMascotas);
router.get("/:id", getMascotaById);

export default router;