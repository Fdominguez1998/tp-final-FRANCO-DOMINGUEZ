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

export const updateMascota = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const mascota = await mascotaService.getMascotaById(id);

    if (!mascota) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    if (
      req.user.role !== "admin" &&
      req.user.role !== "veterinario" &&
      mascota.created_by !== req.user.id
    ) {
      return res
        .status(403)
        .json({ message: "No autorizado para actualizar esta mascota" });
    }

    const { nombre, especie, raza, edad, dueno_id } = req.body;
    const updated = await mascotaService.updateMascota(id, {
      nombre,
      especie,
      raza,
      edad,
      dueno_id,
    });

    if (!updated) {
      return res.status(400).json({ message: "Error actualizando mascota" });
    }

    res.json({ message: "Mascota actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando mascota" });
  }
};

export const deleteMascota = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const mascota = await mascotaService.getMascotaById(id);

    if (!mascota) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    if (
      req.user.role !== "admin" &&
      req.user.role !== "veterinario" &&
      mascota.created_by !== req.user.id
    ) {
      return res
        .status(403)
        .json({ message: "No autorizado para eliminar esta mascota" });
    }

    const deleted = await mascotaService.deleteMascota(id);

    if (!deleted) {
      return res.status(400).json({ message: "Error eliminando mascota" });
    }

    res.json({ message: "Mascota eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando mascota" });
  }
};
