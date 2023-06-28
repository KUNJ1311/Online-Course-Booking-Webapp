import { Router } from "express";
import { checkout, getKey, paymentVerification } from "../controller/paymentController.js";
import Auth from "../middleware/auth.js";
import { reciptmail } from "../controller/paymentmailer.js";
const paymentrouter = Router();

//? POST
paymentrouter.route("/checkout").post(Auth, checkout);
paymentrouter.route("/paymentverification").post(paymentVerification);
paymentrouter.route("/recipt").post(reciptmail);
//? GET
paymentrouter.route("/getkey").get(getKey);
export default paymentrouter;
