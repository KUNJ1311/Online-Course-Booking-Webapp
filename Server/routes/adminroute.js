import { Router } from "express";
const adminrouter = Router();

//! *** all controllers *** !//
import * as controller from "../controller/adminController.js";
import Auth from "../middleware/adminauth.js";

// adminrouter.route("/register").post(controller.register); //! uncomment when you want to add new admin id

export default adminrouter;
