import mongoose from "mongoose";

export const PaymentSchema = new mongoose.Schema({
	razorpay_payment_id: {
		type: String,
		required: true,
	},
	razorpay_order_id: {
		type: String,
		required: true,
	},
	razorpay_signature: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "DCUser",
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	course: {
		type: String,
		required: true,
	},
	product_id: {
		type: Number,
		required: true,
	},
});

export default mongoose.model.DCPayments || mongoose.model("DCPayment", PaymentSchema);
