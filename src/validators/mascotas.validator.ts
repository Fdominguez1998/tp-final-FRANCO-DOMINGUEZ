import { body } from "express-validator";

export const createMascotaValidator = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),

  body("especie").notEmpty().withMessage("La especie es obligatoria"),

  body("dueno_id").isInt().withMessage("dueno_id debe ser un número"),

  body("edad")
    .optional()
    .isInt({ min: 0 })
    .withMessage("La edad debe ser un número positivo"),
];
