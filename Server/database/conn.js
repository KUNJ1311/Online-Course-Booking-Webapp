import mongoose from "mongoose";
import ENV from "../config.js";
const dbConnectionString = ENV.MONGODB_URL;

const connect = async () => {
	await mongoose.connect(dbConnectionString);
	mongoose.set("strictQuery", true);
	console.log("MongoDB Connected Successfully");
};

export default connect;
