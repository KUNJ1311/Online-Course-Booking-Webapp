import mongoose from "mongoose";

export const AdminSchema = new mongoose.Schema({
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
});

export default mongoose.model.DCAdmins || mongoose.model("DCAdmin", AdminSchema);
