import jwt from "jsonwebtoken";
import ENV from "../config.js";
import DCAdminModel from "../model/Admin.model.js";

//* auth middleware
export default async function Auth(req, res, next) {
	try {
		//* access authorize header to validate request
		const token = req.headers.authorization.split(" ")[1];

		//* retrive the user details of the logged in user
		const decodedToken = jwt.verify(token, ENV.JWT_SECRET);
		req.user = decodedToken;
		const email = req.user.email;
		let exist = await DCAdminModel.findOne({ email });
		if (!exist) {
			return res.status(404).send({ error: "Can't Find Admin!" });
		}
		next();
	} catch (error) {
		res.status(401).json({ error: "Authentication Failed!" });
	}
}
