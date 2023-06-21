import React from "react";
import { FaArrowRight } from "react-icons/fa";
import shapeTwo from "./assets/shape-2.png";
import { motion } from "framer-motion";

const Items = ({ projectItems }) => {
	return (
		<>
			{projectItems.map((projectItems) => {
				const { id, img, category, title, description, link } = projectItems;
				return (
					<motion.div layout animate={{ opacity: 1, scale: 1 }} initial={{ opacity: 0.8, scale: 0.6 }} exit={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} key={id} className="portfolio_items card card-two">
						<div className="portfolio_img-wrapper">
							<img src={img} alt="" className="portfolio_img" />
						</div>
						<span className="portfolio_category text-cs">{category}</span>
						<h3 className="portfolio_title">{title}</h3>
						<p className="portfolio_description">{description}</p>
						<a href={link} target="blank" className="link2">
							Buy Now <FaArrowRight className="link_icon2"></FaArrowRight>
						</a>
						<img src={shapeTwo} alt="" className="shape c_shape" />
					</motion.div>
				);
			})}
		</>
	);
};

export default Items;
