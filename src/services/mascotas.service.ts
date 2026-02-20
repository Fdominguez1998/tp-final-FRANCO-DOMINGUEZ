import * as mascotaModel from "../models/mascotas.model";
import { Mascota } from "../models/mascotas.model";

export const createMascota = async (mascota: Mascota) => {
  return await mascotaModel.createMascota(mascota);
};

export const getAllMascotas = async () => {
  return await mascotaModel.getAllMascotas();
};

export const getMascotaById = async (id: number) => {
  return await mascotaModel.getMascotaById(id);
};
