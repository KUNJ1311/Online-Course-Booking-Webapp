import { Router } from "express";
import { checkout } from "../controller/paymentController.js";
import Auth from "../middleware/auth.js";
const paymentrouter = Router();

paymentrouter.route("/checkout").post(Auth, checkout);

export default paymentrouter;
