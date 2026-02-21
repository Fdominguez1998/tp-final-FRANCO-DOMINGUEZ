import * as historialModel from "../models/historial.model";
import { HistorialClinico } from "../models/historial.model";

export const createHistorial = async (historial: HistorialClinico) => {
  return await historialModel.createHistorial(historial);
};

export const getAllHistorial = async () => {
  return await historialModel.getAllHistorial();
};

export const getHistorialByMascota = async (mascota_id: number) => {
  return await historialModel.getHistorialByMascota(mascota_id);
};
