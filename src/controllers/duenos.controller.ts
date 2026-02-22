import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import * as duenoService from "../services/duenos.service";

export const createDueno = async (req: AuthRequest, res: Response) => {
  try {
    const { nombre, telefono, email, direccion } = req.body;

    const id = await duenoService.createDueno({
      nombre,
      telefono,
      email,
      direccion,
      created_by: req.user.id,
    });

    res.status(201).json({ message: "Dueño creado", id });
  } catch (error) {
    res.status(500).json({ message: "Error creando dueño" });
  }
};

export const getAllDuenos = async (req: AuthRequest, res: Response) => {
  try {
    const duenos = await duenoService.getAllDuenos();
    res.json(duenos);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo dueños" });
  }
};

export const getDuenoById = async (req: AuthRequest, res: Response) => {
  try {
    const dueno = await duenoService.getDuenoById(Number(req.params.id));

    if (!dueno) {
      return res.status(404).json({ message: "Dueño no encontrado" });
    }

    res.json(dueno);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo dueño" });
  }
};

export const updateDueno = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const dueno = await duenoService.getDuenoById(id);

    if (!dueno) {
      return res.status(404).json({ message: "Dueño no encontrado" });
    }

    if (dueno.created_by !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "No autorizado para actualizar este dueño" });
    }

    const { nombre, telefono, email, direccion } = req.body;
    const updated = await duenoService.updateDueno(id, {
      nombre,
      telefono,
      email,
      direccion,
    });

    if (!updated) {
      return res.status(400).json({ message: "Error actualizando dueño" });
    }

    res.json({ message: "Dueño actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando dueño" });
  }
};

export const deleteDueno = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const dueno = await duenoService.getDuenoById(id);

    if (!dueno) {
      return res.status(404).json({ message: "Dueño no encontrado" });
    }

    if (dueno.created_by !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "No autorizado para eliminar este dueño" });
    }

    const deleted = await duenoService.deleteDueno(id);

    if (!deleted) {
      return res.status(400).json({ message: "Error eliminando dueño" });
    }

    res.json({ message: "Dueño eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando dueño" });
  }
};
