import { Router } from "express";
import { getUsers } from "../controllers/users.controller";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middleware";

const router = Router();

// SOLO ADMIN puede ver todos los usuarios
router.get("/", authenticateToken, authorizeRoles("admin"), getUsers);

export default router;
