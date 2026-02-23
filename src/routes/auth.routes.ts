import { Router } from "express";
import { createUser, login, getMe } from "../controllers/users.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

// Registro público
router.post("/register", createUser);

// Login público
router.post("/login", login);

// Obtener perfil del usuario autenticado
router.get("/me", authenticateToken, getMe);

export default router;
