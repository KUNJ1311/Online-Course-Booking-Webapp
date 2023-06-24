import React, { useEffect, useState } from "react";
import { userData } from "../helper/helper";
import Nav from "./Nav/Nav";
import HomeMain from "./HomeMain/HomeMain";
import Footer from "../Footer/Footer";
import RegisterForm from "../Login/RegisterForm";

const MainApp = () => {
	const [adduserData, setAddUserData] = useState(null);
	const [formSubmitted, setFormSubmitted] = useState(true);
	//* Getting user data
	const GetData = async () => {
		try {
			const { data, status } = await userData();
			if (status === 201) {
				setAddUserData(data);
			}
			if (data?.formfill === false) {
				setFormSubmitted(false);
			}
			if (data?.formfill === true) {
				setFormSubmitted(true);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		GetData();
	}, [formSubmitted]);
	return (
		<>
			<Nav data={adduserData} setFormSubmitted={setFormSubmitted} />
			<HomeMain />
			<div id="about">
				<Footer />
			</div>
			{!formSubmitted && <RegisterForm data={adduserData} setFormSubmitted={setFormSubmitted} />}
		</>
	);
};

export default MainApp;
