import React, { useState } from "react";
import List from "./List";
import Items from "./Items";
import { projects } from "./Data";
import { AnimatePresence } from "framer-motion";
const Portfolio = () => {
	const allNavList = ["all", ...new Set(projects.map((project) => project.category))];

	const [projectItems, setMenuItems] = useState(projects);
	const [navList] = useState(allNavList);

	const filterItems = (category) => {
		if (category === "all") {
			setMenuItems(projects);
			return;
		}
		const newProjectItems = projects.filter((item) => item.category === category);
		setMenuItems(newProjectItems);
	};
	return (
		<>
			<section className="portfolio section2">
				<h2 className="section_title text-cs p-clr">Courses</h2>
				<List list={navList} filterItems={filterItems} />
				<div className="portfolio_container container2 grid">
					<AnimatePresence initial={false}>
						<Items projectItems={projectItems} />
					</AnimatePresence>
				</div>
			</section>
		</>
	);
};

export default Portfolio;
