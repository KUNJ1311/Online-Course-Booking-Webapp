import mongoose from "mongoose";

export const OtpSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	code: {
		type: Number,
		required: true,
	},
	verified: {
		type: Boolean,
		required: true,
	},
	expiresIn: {
		type: Date,
		required: true,
	},
});

export default mongoose.model.Otps || mongoose.model("Otp", OtpSchema);
