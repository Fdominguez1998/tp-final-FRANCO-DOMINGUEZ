import { Router } from "express";
import { createUser, login } from "../controllers/users.controller";

const router = Router();

// Registro público
router.post("/register", createUser);

// Login público
router.post("/login", login);

export default router;
