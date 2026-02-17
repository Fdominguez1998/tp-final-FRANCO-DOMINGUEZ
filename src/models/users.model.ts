import pool from "../database/mysql";
import { RowDataPacket } from "mysql2";
import { User } from "../types/user.types";

export async function getAllUsers(): Promise<User[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id, email, password, role FROM users",
  );

  return rows as User[];
}

export async function createUser(
  email: string,
  password: string,
  role: string
): Promise<void> {
  await pool.query(
    "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
    [email, password, role]
  );
}
