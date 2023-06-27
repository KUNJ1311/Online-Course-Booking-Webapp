import { instance } from "../index.js";

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
		res.status(500).send({ msg: error });
	}
};

//? Payment Verification
export const paymentVerification = async (req, res) => {
	try {
		const options = {
			amount: Number(req.body.amount * 100), // amount in the smallest currency unit 50000(fifty thousand paisa=five hundred rupee) = 500 RS
			currency: "INR",
		};
		const order = await instance.orders.create(options);
		res.status(200).json({ success: true, order });
	} catch (error) {
		res.status(500).send({ msg: error });
	}
};
