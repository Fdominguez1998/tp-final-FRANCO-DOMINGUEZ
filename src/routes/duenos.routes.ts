import { Router } from "express";
import {
  createDueno,
  getAllDuenos,
  getDuenoById,
  updateDueno,
  deleteDueno,
} from "../controllers/duenos.controller";

import { validateFields } from "../middlewares/validate.middleware";
import { createDuenoValidator } from "../validators/duenos.validator";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticateToken);
router.use(authorizeRoles("admin", "veterinario"));

router.post("/", createDuenoValidator, validateFields, createDueno);
router.get("/", getAllDuenos);
router.get("/:id", getDuenoById);
router.patch("/:id", createDuenoValidator, validateFields, updateDueno); // Usando mismo validador por simplicidad
router.delete("/:id", deleteDueno);

export default router;
