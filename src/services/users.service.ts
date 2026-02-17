import * as userModel from "../models/users.model";
import { User } from "../types/user.types";
import bcrypt from "bcrypt";

export async function getUsers(): Promise<User[]> {
  return await userModel.getAllUsers();
}


export async function registerUser(
  email: string,
  password: string,
  role: string,
): Promise<void> {
  const hashedPassword = await bcrypt.hash(password, 10);

  await userModel.createUser(email, hashedPassword, role);
}
