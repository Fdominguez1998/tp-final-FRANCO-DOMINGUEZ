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

export const updateMascota = async (id: number, mascota: Partial<Mascota>) => {
  return await mascotaModel.updateMascota(id, mascota);
};

export const deleteMascota = async (id: number) => {
  return await mascotaModel.deleteMascota(id);
};
