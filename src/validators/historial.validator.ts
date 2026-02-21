import { body } from "express-validator";

export const createHistorialValidator = [
  body("mascota_id").isInt().withMessage("mascota_id debe ser un número"),

  body("descripcion").notEmpty().withMessage("La descripción es obligatoria"),

  body("fecha_consulta")
    .isDate()
    .withMessage("Debe ser una fecha válida (YYYY-MM-DD)"),
];
