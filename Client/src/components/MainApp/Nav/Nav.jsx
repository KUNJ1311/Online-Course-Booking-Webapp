import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, animateScroll as scroll } from "react-scroll";
import "./nav.css";
import userContext from "../../context/userContext";
import ProfileModal from "../ProfileModal";
import avatar from "../../Login/avatar.svg";
const Nav = ({ data, setFormSubmitted }) => {
	const context = useContext(userContext);
	const { handleClick, handleCloseModal, showModal, modal } = context;
	useEffect(() => {
		modal();
	}, [modal, showModal]);
	const [click, setClick] = useState(false);
	const [active, setActive] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const windowHeight = window.innerHeight;
			const aboutSection = document.getElementById("about");
			const aboutSectionOffset = aboutSection.offsetTop;
			const aboutSectionHeight = aboutSection.offsetHeight;

			if (scrollPosition === 0) {
				setActive(1);
			} else if (scrollPosition + windowHeight >= aboutSectionOffset + aboutSectionHeight) {
				setActive(2);
			} else {
				setActive(1);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleClickNav = () => setClick(!click);
	const Close = () => setClick(false);

	return (
		<>
			<div className={click ? "main-container" : ""} onClick={Close} />
			<nav className="navbar" onClick={(e) => e.stopPropagation()}>
				<div className="nav-container">
					<Link
						to=""
						onClick={() => {
							scroll.scrollToTop();
						}}
						smooth={true}
						duration={500}
						className="nav-logo"
					>
						DC4 IT SOLUTIONS
					</Link>
					<ul className={click ? "nav-menu active" : "nav-menu"}>
						<li className={active === 1 ? "nav-item-active nav-item" : "nav-item"}>
							<Link
								to=""
								onClick={() => {
									scroll.scrollToTop();
								}}
								smooth={true}
								duration={500}
								className="nav-links"
							>
								Home
							</Link>
						</li>
						<li className={active === 2 ? "nav-item-active nav-item" : "nav-item"}>
							<Link to="about" smooth={true} duration={500} className="nav-links">
								About Us
							</Link>
						</li>
						<li className={"p-ico"} onClick={handleClick}>
							<div className="nav-links">
								<div className="social-container profile-ico">
									<img src={avatar} alt="" width="55px" height="55px" />
								</div>
							</div>
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
			{showModal && <ProfileModal onClose={handleCloseModal} data={data} setFormSubmitted={setFormSubmitted} />}
		</>
	);
};

export default Nav;
