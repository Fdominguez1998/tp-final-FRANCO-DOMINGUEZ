import { body } from "express-validator";

export const createDuenoValidator = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Debe ser un email válido"),

  body("telefono")
    .optional()
    .isLength({ min: 6 })
    .withMessage("El teléfono debe tener al menos 6 caracteres")
];