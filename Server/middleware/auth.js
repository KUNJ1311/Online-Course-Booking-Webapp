import jwt from "jsonwebtoken";
import ENV from "../config.js";
import DCUserModel from "../model/User.model.js";

//* auth middleware
export default async function Auth(req, res, next) {
	try {
		//* access authorize header to validate request
		const token = req.headers.authorization.split(" ")[1];

		//* retrive the user details of the logged in user
		const decodedToken = jwt.verify(token, ENV.JWT_SECRET);
		req.user = decodedToken;
		const email = req.user.email;
		let exist = await DCUserModel.findOne({ email });
		if (!exist) {
			return res.status(404).send({ error: "Can't Find User!" });
		}
		next();
	} catch (error) {
		res.status(401).json({ error: "Authentication Failed!" });
	}
}
