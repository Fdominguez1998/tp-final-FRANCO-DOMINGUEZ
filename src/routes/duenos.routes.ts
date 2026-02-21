import { Router } from "express";
import {
  createDueno,
  getAllDuenos,
  getDuenoById,
} from "../controllers/duenos.controller";

import { validateFields } from "../middlewares/validate.middleware";
import { createDuenoValidator } from "../validators/duenos.validator"; // ← NUEVO
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticateToken);
router.use(authorizeRoles("admin", "veterinario"));

router.post("/", createDuenoValidator, validateFields, createDueno); // ← MODIFICADO
router.get("/", getAllDuenos);
router.get("/:id", getDuenoById);

export default router;