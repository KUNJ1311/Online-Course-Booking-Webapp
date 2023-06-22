import React, { useEffect } from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import "./home.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const Home = () => {
	const Navigate = useNavigate();
	//* Check Token to redirect user to main app
	useEffect(() => {
		async function checkToken() {
			const token = localStorage.getItem("coderToken");
			if (token) {
				Navigate("/mainapp");
			}
		}
		checkToken();
	});
	const AutoplaySlider = withAutoplay(AwesomeSlider);
	return (
		<div className="home">
			<Navbar />
			<AutoplaySlider className="aws-btn" play={true} cancelOnInteraction={false} interval={5000} bullets={false}>
				<div data-src="/images/slide-1.jpg" />
				<div data-src="/images/slide-2.jpg" />
				<div data-src="/images/slide-3.jpg" />
			</AutoplaySlider>
			<Footer />
		</div>
	);
};

export default Home;
