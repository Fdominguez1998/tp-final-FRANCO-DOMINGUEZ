import { Request, Response } from "express";
import * as userService from "../services/users.service";

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo usuarios" });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { nombre, apellido, email, password, role } = req.body;

    if (!nombre || !apellido || !email || !password || !role) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    await userService.registerUser(nombre, apellido, email, password, role);

    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Error real:", error);
    res.status(500).json({ message: "Error creando usuario" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const result = await userService.loginUser(email, password);

    res.status(200).json({
      message: "Login exitoso",
      token: result.token,
      user: {
        email,
      },
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}
