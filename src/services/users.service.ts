import * as userModel from "../models/users.model";
import { User } from "../types/user.types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function getUsers(): Promise<User[]> {
  return await userModel.getAllUsers();
}

export async function registerUser(
  nombre: string,
  apellido: string,
  email: string,
  password: string,
  role: string,
): Promise<void> {
  const hashedPassword = await bcrypt.hash(password, 10);

  await userModel.createUser(nombre, apellido, email, hashedPassword, role);
}

export async function loginUser(email: string, password: string) {
  const user = await userModel.findUserByEmail(email);

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Contraseña incorrecta");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" },
  );

  return {
    token,
  };
}
