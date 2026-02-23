import pool from "../database/mysql";
import { RowDataPacket, ResultSetHeader } from "mysql2";
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

export async function getUserById(id: number): Promise<User | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id, nombre, apellido, email, role FROM users WHERE id = ?",
    [id],
  );

  return (rows as User[])[0] || null;
}

export async function updateUser(
  id: number,
  data: {
    nombre?: string;
    apellido?: string;
    email?: string;
    password?: string;
    role?: string;
  },
): Promise<void> {
  const fields: string[] = [];
  const values: any[] = [];

  if (data.nombre !== undefined) {
    fields.push("nombre = ?");
    values.push(data.nombre);
  }
  if (data.apellido !== undefined) {
    fields.push("apellido = ?");
    values.push(data.apellido);
  }
  if (data.email !== undefined) {
    fields.push("email = ?");
    values.push(data.email);
  }
  if (data.password !== undefined) {
    fields.push("password = ?");
    values.push(data.password);
  }
  if (data.role !== undefined) {
    fields.push("role = ?");
    values.push(data.role);
  }

  if (fields.length === 0) {
    return;
  }

  values.push(id);

  await pool.query<ResultSetHeader>(
    `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
    values,
  );
}

export async function deleteUser(id: number): Promise<void> {
  await pool.query<ResultSetHeader>("DELETE FROM users WHERE id = ?", [id]);
}

export async function checkUserHasRelatedRecords(
  id: number,
): Promise<{ hasRecords: boolean; details: string[] }> {
  const details: string[] = [];

  const [duenos] = await pool.query<RowDataPacket[]>(
    "SELECT COUNT(*) as count FROM duenos WHERE created_by = ?",
    [id],
  );
  if (duenos[0].count > 0) {
    details.push(`${duenos[0].count} dueño(s)`);
  }

  const [mascotas] = await pool.query<RowDataPacket[]>(
    "SELECT COUNT(*) as count FROM mascotas WHERE created_by = ?",
    [id],
  );
  if (mascotas[0].count > 0) {
    details.push(`${mascotas[0].count} mascota(s)`);
  }

  const [historiales] = await pool.query<RowDataPacket[]>(
    "SELECT COUNT(*) as count FROM historial_clinico WHERE veterinario_id = ?",
    [id],
  );
  if (historiales[0].count > 0) {
    details.push(`${historiales[0].count} historial(es) clínico(s)`);
  }

  return {
    hasRecords: details.length > 0,
    details,
  };
}
