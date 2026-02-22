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
      veterinario_id: req.user.id,
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

export const getHistorialByMascota = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const historial = await historialService.getHistorialByMascota(
      Number(req.params.mascota_id),
    );

    res.json(historial);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo historial" });
  }
};

export const updateHistorial = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const historial = await historialService.getHistorialById(id);

    if (!historial) {
      return res.status(404).json({ message: "Historial no encontrado" });
    }

    if (historial.veterinario_id !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "No autorizado para actualizar este historial" });
    }

    const { mascota_id, descripcion, tratamiento, fecha_consulta } = req.body;
    const updated = await historialService.updateHistorial(id, {
      mascota_id,
      descripcion,
      tratamiento,
      fecha_consulta,
      veterinario_id: req.user.id,
    });

    if (!updated) {
      return res.status(400).json({ message: "Error actualizando historial" });
    }

    res.json({ message: "Historial actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando historial" });
  }
};

export const deleteHistorial = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const historial = await historialService.getHistorialById(id);

    if (!historial) {
      return res.status(404).json({ message: "Historial no encontrado" });
    }

    if (historial.veterinario_id !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "No autorizado para eliminar este historial" });
    }

    const deleted = await historialService.deleteHistorial(id);

    if (!deleted) {
      return res.status(400).json({ message: "Error eliminando historial" });
    }

    res.json({ message: "Historial eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando historial" });
  }
};
