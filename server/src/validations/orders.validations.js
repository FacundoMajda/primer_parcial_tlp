import { body } from "express-validator";
export const orderValidation = [
  body("userId").isString().withMessage("El campo userId debe ser un string"),
  body("coffee")
    .isIn(["Espresso", "Americano", "Cappuccino"])
    .withMessage(
      "El campo coffee solo puede ser Espresso, Americano o Cappuccino"
    ),
];
