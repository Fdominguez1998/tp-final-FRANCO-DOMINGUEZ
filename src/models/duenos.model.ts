import pool from "../database/mysql";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Dueno } from "../types/duenos.types";

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
      dueno.created_by,
    ],
  );

  return result.insertId;
};

export const getAllDuenos = async () => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT d.*, u.nombre AS creado_por_nombre, u.apellido AS creado_por_apellido
     FROM duenos d
     JOIN users u ON d.created_by = u.id`,
  );

  return rows;
};

export const getDuenoById = async (id: number) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM duenos WHERE id = ?`,
    [id],
  );

  return rows[0];
};

export const updateDueno = async (id: number, dueno: Partial<Dueno>) => {
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE duenos SET nombre = ?, telefono = ?, email = ?, direccion = ? WHERE id = ?`,
    [dueno.nombre, dueno.telefono, dueno.email, dueno.direccion, id],
  );

  return result.affectedRows > 0;
};

export const deleteDueno = async (id: number) => {
  const [result] = await pool.query<ResultSetHeader>(
    `DELETE FROM duenos WHERE id = ?`,
    [id],
  );

  return result.affectedRows > 0;
};
