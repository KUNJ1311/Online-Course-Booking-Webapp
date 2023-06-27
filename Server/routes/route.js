import { Router } from "express";
const router = Router();

//! *** all controllers *** !//
import * as controller from "../controller/appController.js";
import Auth from "../middleware/auth.js";
import { registerMail } from "../controller/mailer.js";

//? POST
router.route("/validateToken").post(controller.validateToken);
router.route("/register").post(controller.register);
router.route("/registerMail").post(registerMail);
router.route("/authenticate").post(controller.verifyUser, (req, res) => {
	res.end();
});
router.route("/login").post(controller.verifyUser, controller.login);
router.route("/checkuser").post(controller.checkUser);
router.route("/registerform").post(Auth, controller.regform);
router.route("/auth").post(Auth, (req, res) => {
	res.status(200).send({ msg: "Verified" });
});

//? GET
router.route("/user/:email").get(controller.getUser);
router.route("/generateOTP").get(controller.generateOTP);
router.route("/verifyOTP").get(controller.verifyOTP);
router.route("/generateOTP/newuser").get(controller.generateOTPnewUser);
router.route("/userdata").get(controller.userdata);

//? PUT
router.route("/resetPassword").put(controller.resetPassword);

export default router;
