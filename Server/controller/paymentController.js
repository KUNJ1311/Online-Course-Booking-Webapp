import { instance } from "../index.js";

export const checkout = async (req, res) => {
	const options = {
		amount: 50000, // amount in the smallest currency unit 50000(fifty thousand paisa=five hundred rupee) = 500 RS
		currency: "INR",
	};
	const order = await instance.orders.create(options);
	console.log(order);
	res.status(200).json({ success: true });
};
