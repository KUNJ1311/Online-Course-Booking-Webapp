import { Router } from "express";
const adminrouter = Router();

//! *** all controllers *** !//
import * as controller from "../controller/adminController.js";
import AdminAuth from "../middleware/adminauth.js";

// adminrouter.route("/register").post(controller.register); //! uncomment when you want to add new admin id
adminrouter.route("/login").post(controller.adminlogin);
adminrouter.route("/auth").post(AdminAuth, (req, res) => {
	res.status(200).send({ msg: "Verified" });
});

export default adminrouter;
