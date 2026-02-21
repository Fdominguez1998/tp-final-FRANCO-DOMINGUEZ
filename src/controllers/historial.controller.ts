import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import * as historialService from "../services/historial.service";

export const createHistorial = async (req: AuthRequest, res: Response) => {
  try {
    const { mascota_id, descripcion, tratamiento, fecha_consulta } = req.body;

    const id = await historialService.createHistorial({
      mascota_id,
      descripcion,
      tratamiento,
      fecha_consulta,
      veterinario_id: req.user.id
    });

    res.status(201).json({ message: "Registro clínico creado", id });
  } catch (error) {
    res.status(500).json({ message: "Error creando historial clínico" });
  }
};

export const getAllHistorial = async (req: AuthRequest, res: Response) => {
  try {
    const historial = await historialService.getAllHistorial();
    res.json(historial);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo historial" });
  }
};

export const getHistorialByMascota = async (req: AuthRequest, res: Response) => {
  try {
    const historial = await historialService.getHistorialByMascota(
      Number(req.params.mascota_id)
    );

    res.json(historial);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo historial" });
  }
};