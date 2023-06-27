import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/conn.js";
import router from "./routes/route.js";
import paymentrouter from "./routes/payment.js";
import Razorpay from "razorpay";
import ENV from "./config.js";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); //? less hackers know about our stack
app.use(bodyParser.urlencoded({ extended: true }));

const port = 8080;

export const instance = new Razorpay({
	key_id: ENV.RAZORPAY_API_KEY,
	key_secret: ENV.RAZORPAY_API_SECRET,
});

//* HTTP GET Request
app.get("/", (req, res) => {
	res.status(201).json("Hello Backend!");
});

//* api routes
app.use("/api", router);
app.use("/payment", paymentrouter);
//* Start Server only when valid connection
connect()
	.then(() => {
		try {
			app.listen(port, () => {
				console.log(`Server connected to http://localhost:${port}`);
			});
		} catch (error) {
			console.log("Cannot connect to the server");
		}
	})
	.catch(() => {
		console.log("Invalid Database Connection...!");
	});
