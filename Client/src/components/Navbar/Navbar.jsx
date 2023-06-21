import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import MainModal from "../Login/MainModal";
import userContext from "../context/userContext";
const Navbar = () => {
	const context = useContext(userContext);
	const { handleClick, handleCloseModal, showModal, modal } = context;
	useEffect(() => {
		modal();
	}, [modal, showModal]);

	return (
		<>
			<nav className="nav">
				<ul>
					<li className="title">
						<Link to="/">DC4 IT SOLUTIONS</Link>
					</li>
					<li>
						<div>
							<button className="btn" onClick={handleClick}>
								Get Started
							</button>
						</div>
					</li>
				</ul>
			</nav>
			{showModal && <MainModal onClose={handleCloseModal} />}
		</>
	);
};

export default Navbar;
