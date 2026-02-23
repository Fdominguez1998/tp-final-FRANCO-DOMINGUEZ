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

export async function getMe(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const user = await userService.getUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo usuario" });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const userId = Number(req.params.id);
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo usuario" });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const userId = Number(req.params.id);
    const { nombre, apellido, email, password, role } = req.body;

    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await userService.updateUser(userId, {
      nombre,
      apellido,
      email,
      password,
      role,
    });

    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando usuario" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const userId = Number(req.params.id);

    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await userService.deleteUser(userId);
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error: any) {
    if (error.message && error.message.includes("registros relacionados")) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Error eliminando usuario" });
  }
}
