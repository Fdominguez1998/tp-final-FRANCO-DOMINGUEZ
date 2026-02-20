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
