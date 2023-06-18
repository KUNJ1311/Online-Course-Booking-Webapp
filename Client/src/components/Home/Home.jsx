import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import "./home.css";

const Home = () => {
	const AutoplaySlider = withAutoplay(AwesomeSlider);
	return (
		<div className="home">
			<AutoplaySlider className="aws-btn" bullets={false} play={true} cancelOnInteraction={false} interval={6000}>
				<div data-src="/path/to/image-0.png" />
				<div data-src="/path/to/image-1.png" />
				<div data-src="/path/to/image-2.jpg" />
			</AutoplaySlider>
		</div>
	);
};

export default Home;
