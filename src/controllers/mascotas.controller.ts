import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import * as mascotaService from "../services/mascotas.service";

export const createMascota = async (req: AuthRequest, res: Response) => {
  try {
    const { nombre, especie, raza, edad, dueno_id } = req.body;

    const id = await mascotaService.createMascota({
      nombre,
      especie,
      raza,
      edad,
      dueno_id,
      created_by: req.user.id,
    });

    res.status(201).json({ message: "Mascota creada", id });
  } catch (error) {
    res.status(500).json({ message: "Error creando mascota" });
  }
};

export const getAllMascotas = async (req: AuthRequest, res: Response) => {
  try {
    const mascotas = await mascotaService.getAllMascotas();
    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo mascotas" });
  }
};

export const getMascotaById = async (req: AuthRequest, res: Response) => {
  try {
    const mascota = await mascotaService.getMascotaById(Number(req.params.id));

    if (!mascota) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    res.json(mascota);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo mascota" });
  }
};
