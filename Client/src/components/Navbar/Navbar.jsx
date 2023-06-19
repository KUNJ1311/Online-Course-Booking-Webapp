import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import MainModal from "../Login/MainModal";
const Navbar = () => {
	const [showModal, setShowModal] = useState(false);

	//* Get Started to login
	const handleClick = () => {
		setShowModal(true);
	};

	//* Close login page
	const handleCloseModal = () => {
		setShowModal(false);
	};

	//* Close login page with ESC Key
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				handleCloseModal();
			}
		};
		if (showModal) {
			document.addEventListener("keydown", handleKeyDown);
		} else {
			document.removeEventListener("keydown", handleKeyDown);
		}
	}, [showModal]);

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
