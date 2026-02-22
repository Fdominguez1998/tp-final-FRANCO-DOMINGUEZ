import { Router } from "express";
import {
  createMascota,
  getAllMascotas,
  getMascotaById,
  updateMascota,
  deleteMascota,
} from "../controllers/mascotas.controller";

import { validateFields } from "../middlewares/validate.middleware";
import { createMascotaValidator } from "../validators/mascotas.validator";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticateToken);
router.use(authorizeRoles("admin", "veterinario"));

router.post("/", createMascotaValidator, validateFields, createMascota);
router.get("/", getAllMascotas);
router.get("/:id", getMascotaById);
router.patch("/:id", createMascotaValidator, validateFields, updateMascota);
router.delete("/:id", deleteMascota);

export default router;
