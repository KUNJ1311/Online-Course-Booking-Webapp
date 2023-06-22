import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: { true: "Please provide unique Username" },
		unique: { true: "Username Exist" },
	},
	password: {
		type: String,
		required: { true: "Please provide a password" },
		unique: false,
	},
	email: {
		type: String,
		required: { true: "Please provide a unique email" },
		unique: true,
	},
	fullname: {
		type: String,
		default: "",
	},
	phone: {
		type: Number,
		default: "",
	},
	college: {
		type: String,
		default: "",
	},
	address: {
		type: String,
		default: "",
	},
	formfill: {
		type: Boolean,
		default: false,
	},
});

export default mongoose.model.DCUsers || mongoose.model("DCUser", UserSchema);
