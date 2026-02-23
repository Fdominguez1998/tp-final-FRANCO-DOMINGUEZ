import * as historialModel from "../models/historial.model";
import { HistorialClinico } from "../types/historial.types";

export const createHistorial = async (historial: HistorialClinico) => {
  return await historialModel.createHistorial(historial);
};

export const getAllHistorial = async () => {
  return await historialModel.getAllHistorial();
};

export const getHistorialByMascota = async (mascota_id: number) => {
  return await historialModel.getHistorialByMascota(mascota_id);
};

export const getHistorialById = async (id: number) => {
  return await historialModel.getHistorialById(id);
};

export const updateHistorial = async (
  id: number,
  historial: Partial<HistorialClinico>,
) => {
  return await historialModel.updateHistorial(id, historial);
};

export const deleteHistorial = async (id: number) => {
  return await historialModel.deleteHistorial(id);
};
