import pool from "../database/mysql";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Mascota {
  id?: number;
  nombre: string;
  especie: string;
  raza?: string;
  edad?: number;
  dueno_id: number;
  created_by: number;
  created_at?: Date;
}

export const createMascota = async (mascota: Mascota) => {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO mascotas
     (nombre, especie, raza, edad, dueno_id, created_by)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      mascota.nombre,
      mascota.especie,
      mascota.raza,
      mascota.edad,
      mascota.dueno_id,
      mascota.created_by,
    ],
  );

  return result.insertId;
};

export const getAllMascotas = async () => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT m.*, d.nombre AS dueno_nombre,
            u.nombre AS creado_por_nombre
     FROM mascotas m
     JOIN duenos d ON m.dueno_id = d.id
     JOIN users u ON m.created_by = u.id`,
  );

  return rows;
};

export const getMascotaById = async (id: number) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM mascotas WHERE id = ?`,
    [id],
  );

  return rows[0];
};

export const updateMascota = async (id: number, mascota: Partial<Mascota>) => {
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE mascotas SET nombre = ?, especie = ?, raza = ?, edad = ?, dueno_id = ? WHERE id = ?`,
    [
      mascota.nombre,
      mascota.especie,
      mascota.raza,
      mascota.edad,
      mascota.dueno_id,
      id,
    ],
  );

  return result.affectedRows > 0;
};

export const deleteMascota = async (id: number) => {
  const [result] = await pool.query<ResultSetHeader>(
    `DELETE FROM mascotas WHERE id = ?`,
    [id],
  );

  return result.affectedRows > 0;
};
