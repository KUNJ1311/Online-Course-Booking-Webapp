import DCAdminModel from "../model/Admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";

//! uncomment when you want to add new admin id
// //? POST: http://localhost:8080/api/admin/register
// export async function register(req, res) {
// 	try {
// 		const { email, password } = req.body;
// 		if (password) {
// 			const hashedPassword = await bcrypt.hash(password, 10);

// 			const user = new DCAdminModel({
// 				password: hashedPassword,
// 				email,
// 			});

// 			//* return save result as a response
// 			await user.save();
// 			res.status(201).send({ msg: "User Register Successfully" });
// 		}
// 	} catch (error) {
// 		return res.status(500).send(error);
// 	}
// }
