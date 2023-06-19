import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import "./home.css";
import Navbar from "../Navbar/Navbar";

const Home = () => {
	const AutoplaySlider = withAutoplay(AwesomeSlider);
	return (
		<>
			<Navbar />
			<AutoplaySlider className="aws-btn" play={true} cancelOnInteraction={false} interval={5000} bullets={false}>
				<div data-src="/images/slide-1.jpg" />
				<div data-src="/images/slide-2.jpg" />
				<div data-src="/images/slide-3.jpg" />
			</AutoplaySlider>
		</>
	);
};

export default Home;
