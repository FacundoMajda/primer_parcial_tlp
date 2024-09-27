import { Router } from "express";
import {
  createOrderCtrl,
  getAllOrdersCtrl,
} from "../controllers/order.controller.js";
import { orderValidation } from "../validations/orders.validations.js";
import { applyValidations } from "../validations/apply.validations.js";
import { validateJwt } from "../middlewares/validateJwt.js";

const ordersRouter = Router();

ordersRouter.get("/", getAllOrdersCtrl);

ordersRouter.post(
  "/",
  validateJwt,
  orderValidation,
  applyValidations,
  createOrderCtrl
);

export { ordersRouter };
