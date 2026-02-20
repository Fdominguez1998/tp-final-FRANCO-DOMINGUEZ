import pool from "../database/mysql";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Dueno {
  id?: number;
  nombre: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  created_by: number;
  created_at?: Date;
}

export const createDueno = async (dueno: Dueno) => {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO duenos 
     (nombre, telefono, email, direccion, created_by) 
     VALUES (?, ?, ?, ?, ?)`,
    [
      dueno.nombre,
      dueno.telefono,
      dueno.email,
      dueno.direccion,
      dueno.created_by
    ]
  );

  return result.insertId;
};

export const getAllDuenos = async () => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT d.*, u.nombre AS creado_por_nombre, u.apellido AS creado_por_apellido
     FROM duenos d
     JOIN users u ON d.created_by = u.id`
  );

  return rows;
};

export const getDuenoById = async (id: number) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM duenos WHERE id = ?`,
    [id]
  );

  return rows[0];
};