import React from "react";
import "./navbar.css";
const Navbar = () => {
	return (
		<nav className="nav">
			<ul>
				<li className="title">DC4 IT SOLUTIONS</li>
				<li>
					<div>
						<button className="btn">Login</button>
						<button className="btn">Register</button>
					</div>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
