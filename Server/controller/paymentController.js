import { instance } from "../index.js";
import ENV from "../config.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import DCPaymentModel from "../model/Payment.model.js";
import DCUserModel from "../model/User.model.js";
import { reciptmail } from "./paymentmailer.js";

//? Taking Order Checkout
export const checkout = async (req, res) => {
	try {
		const options = {
			amount: Number(req.body.amount * 100), // amount in the smallest currency unit 50000(fifty thousand paisa=five hundred rupee) = 500 RS
			currency: "INR",
		};
		const order = await instance.orders.create(options);
		res.status(200).json({ success: true, order });
	} catch (error) {
		console.log(error);
		res.status(500).send({ msg: error });
	}
};

//? Payment Verification
export const paymentVerification = async (req, res) => {
	try {
		const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
		const { product_id, course, email, amount, fullname } = req.query;
		const isAuthentic = validatePaymentVerification({ order_id: razorpay_order_id, payment_id: razorpay_payment_id }, razorpay_signature, ENV.RAZORPAY_API_SECRET);
		if (isAuthentic) {
			const user = await DCUserModel.findOne({ email });
			if (user) {
				await DCPaymentModel.create({
					razorpay_payment_id,
					razorpay_order_id,
					razorpay_signature,
					user: user._id,
					course,
					product_id,
					amount: Number(amount) / 100,
				});
				res.redirect(`http://localhost:3000/mainapp?reference=${razorpay_payment_id}`);
				const reference_id = razorpay_payment_id;
				await reciptmail(fullname, course, amount, email, reference_id);
			} else {
				res.status(401).json({ success: false, msg: "user not found" });
			}
		} else {
			res.status(400).json({ success: false });
		}
	} catch (error) {
		res.status(500).send({ msg: error });
	}
};

//? get key
export const getKey = (req, res) => {
	try {
		res.status(200).json({ key: ENV.RAZORPAY_API_KEY });
	} catch (error) {
		res.status(500).json({ error });
	}
};
