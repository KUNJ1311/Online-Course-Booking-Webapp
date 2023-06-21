import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./nav.css";
import userContext from "../../context/userContext";
import ProfileModal from "../ProfileModal";
import avatar from "../../Login/avatar.svg";
const Nav = () => {
	const context = useContext(userContext);
	const { handleClick, handleCloseModal, showModal, modal } = context;
	useEffect(() => {
		modal();
	}, [showModal]);
	const [click, setClick] = useState(false);
	const location = useLocation();
	const [active, setActive] = useState(0);

	useEffect(() => {
		const { pathname } = location;
		if (pathname === "/mainapp") {
			setActive(1);
		} else if (pathname === "/about") {
			setActive(2);
		} else if (pathname === "/profile") {
			setActive(4);
		} else if (pathname === "/contact") {
			setActive(3);
		}
	}, [location]);

	const handleClickNav = () => setClick(!click);
	const Close = () => setClick(false);

	return (
		<>
			<div className={click ? "main-container" : ""} onClick={Close} />
			<nav className="navbar" onClick={(e) => e.stopPropagation()}>
				<div className="nav-container">
					<Link to="/mainapp" className="nav-logo">
						DC4 IT SOLUTIONS
					</Link>
					<ul className={click ? "nav-menu active" : "nav-menu"}>
						<li className={active === 1 ? "nav-item-active nav-item" : "nav-item"}>
							<Link to="/mainapp" className="nav-links">
								Home
							</Link>
						</li>
						<li className={active === 2 ? "nav-item-active nav-item" : "nav-item"}>
							<Link to="/about" className="nav-links">
								About
							</Link>
						</li>
						<li className={active === 3 ? "nav-item-active nav-item" : "nav-item"}>
							<Link to="/contact" className="nav-links">
								Contact Us
							</Link>
						</li>
						<li className={"p-ico"} onClick={handleClick}>
							<Link className="nav-links">
								<div className="social-container profile-ico">
									<img src={avatar} alt="" width="55px" height="55px" />
								</div>
							</Link>
						</li>
					</ul>
					<div className="nav-icon" onClick={handleClickNav}>
						<div
							style={{
								width: "24px",
								height: "18px",
								position: "relative",
								transform: "rotate(0deg)",
							}}
						>
							<span
								style={{
									display: "block",
									height: "2px",
									width: "100%",
									background: "#ffdd40",
									transitionTimingFunction: "ease",
									transitionDuration: "0.3s",
									borderRadius: "1px",
									transformOrigin: "center center",
									position: "absolute",
									transform: !click ? "translate3d(0px, 0px, 0px) rotate(0deg)" : "translate3d(0px, 9px, 0px) rotate(45deg)",
									marginTop: "-1px",
								}}
							></span>
							<span
								style={{
									display: "block",
									height: "2px",
									width: "100%",
									background: "#ffdd40",
									transitionTimingFunction: "ease",
									transitionDuration: "0.2s",
									borderRadius: "1px",
									transformOrigin: "center center",
									position: "absolute",
									left: click ? "80px" : "0px",
									marginTop: "8px",
								}}
							></span>
							<span
								style={{
									display: "block",
									height: "2px",
									width: "100%",
									background: "#ffdd40",
									transitionTimingFunction: "ease",
									transitionDuration: "0.3s",
									borderRadius: "1px",
									transformOrigin: "center center",
									position: "absolute",
									transform: !click ? "translate3d(0px, 18px, 0px) rotate(0deg)" : "translate3d(0px, 9px, 0px) rotate(-45deg)",
									marginTop: "-1px",
								}}
							></span>
						</div>
					</div>
				</div>
			</nav>
			{showModal && <ProfileModal onClose={handleCloseModal} />}
		</>
	);
};

export default Nav;
