import { Router } from "express";
import { getUsers } from "../controllers/users.controller";
import { createUser } from "../controllers/users.controller";
import { login } from "../controllers/users.controller";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middleware";

const router = Router();

// SOLO ADMIN puede crear usuarios
router.post("/", authenticateToken, authorizeRoles("admin"), createUser);

// SOLO ADMIN puede ver todos los usuarios
router.get("/", authenticateToken, authorizeRoles("admin"), getUsers);

//login publico
router.post("/login", login);

export default router;
