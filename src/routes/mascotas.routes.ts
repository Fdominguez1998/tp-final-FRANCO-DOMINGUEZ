import { Router } from "express";
import {
  createMascota,
  getAllMascotas,
  getMascotaById,
} from "../controllers/mascotas.controller";

import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticateToken);
router.use(authorizeRoles("admin", "veterinario"));

router.post("/", createMascota);
router.get("/", getAllMascotas);
router.get("/:id", getMascotaById);

export default router;
