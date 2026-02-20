import * as duenoModel from "../models/duenos.model";
import { Dueno } from "../models/duenos.model";

export const createDueno = async (dueno: Dueno) => {
  return await duenoModel.createDueno(dueno);
};

export const getAllDuenos = async () => {
  return await duenoModel.getAllDuenos();
};

export const getDuenoById = async (id: number) => {
  return await duenoModel.getDuenoById(id);
};