import { Router } from "express";
import { checkout } from "../controller/paymentController.js";
const paymentrouter = Router();

paymentrouter.route("/checkout").post(checkout);

export default paymentrouter;
