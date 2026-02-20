import { Router } from "express";
import {
  createDueno,
  getAllDuenos,
  getDuenoById,
} from "../controllers/duenos.controller";

import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticateToken);
router.use(authorizeRoles("admin", "veterinario"));

router.post("/", createDueno);
router.get("/", getAllDuenos);
router.get("/:id", getDuenoById);

export default router;
