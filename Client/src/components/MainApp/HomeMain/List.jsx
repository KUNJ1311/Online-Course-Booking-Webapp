import React, { useState } from "react";

const List = ({ list, filterItems }) => {
	const [active, setActive] = useState(0);
	return (
		<div className="portfolio_list">
			{list.map((category, index) => {
				return (
					<button
						key={index}
						className={`${active === index ? "active-work" : ""}   portfolio_list-item text-cs`}
						onClick={() => {
							setActive(index);
							filterItems(category);
						}}
					>
						{category}
					</button>
				);
			})}
		</div>
	);
};

export default List;
