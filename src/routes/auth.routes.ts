import { Router } from "express";
import { createUser, login, getMe } from "../controllers/users.controller";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middleware";

const router = Router();

// Registro solo para admin autenticado
router.post(
  "/register",
  authenticateToken,
  authorizeRoles("admin"),
  createUser,
);

// Login público
router.post("/login", login);

// Obtener perfil del usuario autenticado
router.get("/me", authenticateToken, getMe);

export default router;
