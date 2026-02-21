import pool from "../database/mysql";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface HistorialClinico {
  id?: number;
  mascota_id: number;
  veterinario_id: number;
  descripcion: string;
  tratamiento?: string;
  fecha_consulta: string;
  created_at?: Date;
}

export const createHistorial = async (historial: HistorialClinico) => {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO historial_clinico
     (mascota_id, veterinario_id, descripcion, tratamiento, fecha_consulta)
     VALUES (?, ?, ?, ?, ?)`,
    [
      historial.mascota_id,
      historial.veterinario_id,
      historial.descripcion,
      historial.tratamiento,
      historial.fecha_consulta,
    ],
  );

  return result.insertId;
};

export const getAllHistorial = async () => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT h.*, 
            m.nombre AS mascota_nombre,
            u.nombre AS veterinario_nombre
     FROM historial_clinico h
     JOIN mascotas m ON h.mascota_id = m.id
     JOIN users u ON h.veterinario_id = u.id`,
  );

  return rows;
};

export const getHistorialByMascota = async (mascota_id: number) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM historial_clinico WHERE mascota_id = ?`,
    [mascota_id],
  );

  return rows;
};
