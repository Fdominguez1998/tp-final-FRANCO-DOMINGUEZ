import pool from "../database/mysql";
import { RowDataPacket } from "mysql2";
import { User } from "../types/user.types";

export async function getAllUsers(): Promise<User[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id, nombre, apellido, email, password, role FROM users",
  );

  return rows as User[];
}

export async function createUser(
  nombre: string,
  apellido: string,
  email: string,
  password: string,
  role: string,
): Promise<void> {
  await pool.query(
    "INSERT INTO users (nombre, apellido, email, password, role) VALUES (?, ?, ?, ?, ?)",
    [nombre, apellido, email, password, role],
  );
}

export async function findUserByEmail(email: string) {
  const [rows] = await pool.query(
    "SELECT id, email, password, role FROM users WHERE email = ?",
    [email],
  );

  return (rows as any[])[0];
}
