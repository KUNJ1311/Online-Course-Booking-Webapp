import React from "react";
import { FaArrowRight } from "react-icons/fa";
import shapeTwo from "./assets/shape-2.png";
import { motion } from "framer-motion";
import { checkoutHandler, userData } from "../../helper/helper";
import axios from "axios";
import { toast } from "react-toastify";

const Items = ({ projectItems }) => {
	const host = process.env.REACT_APP_HOST;
	const handleBuy = async (amount, id, title, category) => {
		try {
			const {
				data: { key },
			} = await axios.get(`${host}/payment/getkey`);
			const {
				data: { order },
				status,
			} = await checkoutHandler(amount);
			if (status === 200) {
				const { data, status } = await userData();
				if (status === 201) {
					const callbackParams = new URLSearchParams({
						course: category + " - " + title,
						amount: order.amount,
						product_id: id,
						fullname: data.fullname,
						email: data.email,
					});
					const options = {
						key,
						amount: order.amount,
						currency: "INR",
						name: "DC4 IT SOLUTIONS",
						description: "Transaction",
						image: "https://avatars.githubusercontent.com/u/74526794?v=4",
						order_id: order.id,
						callback_url: `${host}/payment/paymentverification?${callbackParams.toString()}`,
						prefill: {
							name: data.fullname,
							email: data.email,
							contact: data.phone,
						},
						notes: {
							address: data.address,
						},
						theme: {
							color: "#29a385",
						},
					};
					const razor = new window.Razorpay(options);
					razor.on("payment.failed", function (response) {
						response && toast.error("Something went wrong! Please try again.");
					});
					razor.open();
				}
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			{projectItems.map((data) => {
				const { id, img, category, title, description, newprice, price } = data;
				const amount = newprice ? newprice : price;
				return (
					<motion.div layout animate={{ opacity: 1, scale: 1 }} initial={{ opacity: 0.8, scale: 0.6 }} exit={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} key={id} className="portfolio_items card card-two">
						<div className="portfolio_img-wrapper">
							<img src={img} alt="" className="portfolio_img" />
						</div>
						<span className="portfolio_category text-cs">{category}</span>
						<h3 className="portfolio_title">{title}</h3>
						<p className="portfolio_description">{description}</p>
						<div className="justify-sb">
							<h4 className="mb-2">
								{newprice && <del className="price">₹{price}</del>}
								<span className="newprice">₹{amount}</span>
							</h4>
							<span className="link2 link-hover" onClick={() => handleBuy(amount, id, title, category)}>
								Buy Now <FaArrowRight className="link_icon2"></FaArrowRight>
							</span>
						</div>
						<img src={shapeTwo} alt="" className="shape c_shape" />
					</motion.div>
				);
			})}
		</>
	);
};

export default Items;
