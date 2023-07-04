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

//? POST: http://localhost:8080/api/admin/login
export async function adminlogin(req, res) {
	const { email, password } = req.body;
	try {
		const user = await DCAdminModel.findOne({ email });
		const passwordCheck = await bcrypt.compare(password, user.password);
		if (!passwordCheck) {
			return res.status(400).send({ error: "Don't have Password" });
		}

		//* create jwt token
		const token = jwt.sign(
			{
				userId: user._id,
				email: user.email,
			},
			ENV.JWT_SECRET
		);

		return res.status(200).send({
			msg: "Login Successful...!",
			email: user.email,
			token,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({ error });
	}
}
