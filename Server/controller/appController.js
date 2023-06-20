import UserModal from "../model/User.modal.js";
import OtpModal from "../model/Otp.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";

//* middleware for verify user
export async function verifyUser(req, res, next) {
	try {
		const { email } = req.method == "GET" ? req.query : req.body;
		//* check the user existance
		let exist = await UserModal.findOne({ email });
		if (!exist) {
			return res.status(404).send({ error: "Can't Find User!" });
		}
		next();
	} catch (error) {
		return res.status(404).send(error);
	}
}

//* validateToken for redirect user to main app
export async function validateToken(req, res) {
	const token = req.body.token;
	try {
		const decodedToken = jwt.verify(token, ENV.JWT_SECRET);
		const userId = decodedToken.userId;
		const user = await UserModal.findById(userId);
		if (user) {
			return res.status(200).send({ message: "Token is valid." });
		} else {
			return res.status(401).send({ error: "Token is invalid." });
		}
	} catch (error) {
		return res.status(401).send({ error: "Token is invalid." });
	}
}

//? POST: http://localhost:8080/api/checkuser
export async function checkUser(req, res) {
	try {
		//* check the existing user
		const { username, email } = req.body;
		const existUsername = await UserModal.findOne({ username });
		if (existUsername) {
			return res.status(400).send({ msg: "Sorry a user with this Username is already exists" });
		}
		//* check the existing email
		const existEmail = await UserModal.findOne({ email });
		if (existEmail) {
			return res.status(400).send({ msg: "Sorry E-mail Id is already exists" });
		}
		return res.status(200).send({ msg: "User can register" });
	} catch (error) {
		return res.status(401).send({ error: "User already exist..!" });
	}
}

//? POST: http://localhost:8080/api/register
export async function register(req, res) {
	try {
		const { username, email, password } = req.body;
		if (password) {
			const hashedPassword = await bcrypt.hash(password, 10);

			const otpData = await OtpModal.findOne({ email });
			if (!otpData || !otpData.verified || otpData.expiresIn < new Date(Date.now())) {
				//* return error response if OTP is not verified
				return res.status(401).send({ error: "Please verify your OTP first" });
			}

			const user = new UserModal({
				username,
				password: hashedPassword,
				email,
			});

			//* return save result as a response
			await user.save();
			await OtpModal.deleteOne({ email });
			res.status(201).send({ msg: "User Register Successfully" });
		}
	} catch (error) {
		return res.status(500).send(error);
	}
}

//? POST: http://localhost:8080/api/login
export async function login(req, res) {
	const { email, password } = req.body;
	try {
		const user = await UserModal.findOne({ email });
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
			username: user.username,
			email: user.email,
			token,
		});
	} catch (error) {
		return res.status(500).send({ error });
	}
}

//? GET: http://localhost:8080/api/userdata
export async function userdata(req, res) {
	try {
		const token = req.headers.authorization.split(" ")[1];
		//* retrive the user details of the logged in user
		const decodedToken = jwt.verify(token, ENV.JWT_SECRET);
		const id = decodedToken.userId;
		const data = await UserModal.findOne({ _id: id });
		//! remove password from user JSON
		const { email, username } = Object.assign({}, data.toJSON());
		return res.status(201).send({ email, username });
	} catch (error) {
		return res.status(500).send({ msg: "User not Found" });
	}
}

//? GET: http://localhost:8080/api/user/email
export async function getUser(req, res) {
	try {
		const { email } = req.params;
		const user = await UserModal.findOne({ email });
		if (!user) {
			return res.status(500).send({ msg: "Couldn't Find User" });
		}
		//! remove password from user JSON
		const { password, ...rest } = Object.assign({}, user.toJSON());
		return res.status(201).send(rest);
	} catch (error) {
		return res.status(404).send({ error });
	}
}

//? GET: http://localhost:8080/api/generateOTP
export async function generateOTP(req, res) {
	try {
		const { email } = req.query;
		let user = await UserModal.findOne({ email });
		if (user) {
			let otpData = await OtpModal.findOne({ email });
			let otpCode;
			if (!otpData) {
				//* create new OTP object if it doesn't exist
				otpCode = Math.floor(100000 + Math.random() * 900000);
				otpData = new OtpModal({
					email,
					code: otpCode,
					verified: false,
					expiresIn: new Date(Date.now() + 300 * 1000), //* 5 minutes
				});
			} else {
				//* update existing OTP object with new code and expiration time
				otpCode = Math.floor(100000 + Math.random() * 900000);
				otpData.code = otpCode;
				otpData.verified = false;
				otpData.expiresIn = new Date(Date.now() + 300 * 1000); //* 5 minutes
			}
			await otpData.save();
			return res.status(201).send({ msg: "Please check your Email Id", code: otpCode, username: user.username });
		} else {
			return res.status(401).send({ error: "Email Id not Exist" });
		}
	} catch (error) {
		return res.status(500).send(error);
	}
}

//? GET: http://localhost:8080/api/generateOTP/newUser
export async function generateOTPnewUser(req, res) {
	try {
		const { email } = req.query;
		let otpData = await OtpModal.findOne({ email });
		let otpCode;
		if (!otpData) {
			//* create new OTP object if it doesn't exist
			otpCode = Math.floor(100000 + Math.random() * 900000);
			otpData = new OtpModal({
				email,
				code: otpCode,
				verified: false,
				expiresIn: new Date(Date.now() + 300 * 1000), //* 5 minutes
			});
		} else {
			//* update existing OTP object with new code and expiration time
			otpCode = Math.floor(100000 + Math.random() * 900000);
			otpData.code = otpCode;
			otpData.verified = false;
			otpData.expiresIn = new Date(Date.now() + 300 * 1000); //* 5 minutes
		}
		await otpData.save();
		return res.status(201).send({ msg: "Please check your Email Id", code: otpCode });
	} catch (error) {
		return res.status(500).send(error);
	}
}

//? GET: http://localhost:8080/api/verifyOTP
export async function verifyOTP(req, res) {
	const { code, email } = req.query;
	let otpData = await OtpModal.findOne({ email });
	if (otpData.code === parseInt(code)) {
		if (otpData.expiresIn < new Date().getTime()) {
			//* if OTP is expired
			return res.status(400).send({ error: "Your OTP has timed out and is no longer valid" });
		}
		//* set verified to true
		otpData.verified = true;
		await otpData.save();
		return res.status(200).send({ msg: "Verified Successfully!" });
	} else {
		return res.status(400).send({ error: "Sorry, the OTP you entered is invalid..!" });
	}
}

//? PUT: http://localhost:8080/api/updateUser
export async function updateUser(req, res) {
	try {
		const { userId } = req.user;
		if (userId) {
			const body = req.body;
			//* update the data
			const result = await UserModal.updateOne({ _id: userId }, body);
			if (result.nModified === 0) {
				return res.status(404).send({ error: "User not found" });
			}
			return res.status(201).send({ msg: "Record Updated..!" });
		} else {
			return res.status(401).send({ error: "User Not Found...!" });
		}
	} catch (error) {
		return res.status(401).send(error);
	}
}

//? PUT: http://localhost:8080/api/resetPassword
export async function resetPassword(req, res) {
	const { email, password } = req.body;
	let otpData = await OtpModal.findOne({ email });
	if (otpData && otpData.verified && otpData.expiresIn > new Date().getTime()) {
		const user = await UserModal.findOne({ email });
		if (user) {
			const hashedPassword = await bcrypt.hash(password, 10);
			await UserModal.findOneAndUpdate({ email }, { password: hashedPassword });
			//* delete the OTP data
			await OtpModal.deleteOne({ email });
			return res.status(201).send({ msg: "Record Updated Successfully" });
		} else {
			return res.status(401).send({ error: "User not found..!" });
		}
	} else {
		if (otpData && otpData.expiresIn > new Date().getTime()) {
			await OtpModal.deleteOne({ email });
			return res.status(401).send({ error: "OTP Expired..!" });
		} else {
			return res.status(401).send({ error: "Access Denied! Please verify the OTP first." });
		}
	}
}
