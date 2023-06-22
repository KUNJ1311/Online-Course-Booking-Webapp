import React, { useEffect, useState } from "react";
import Form from "../Login/Form";
import { userData } from "../helper/helper";
import Nav from "./Nav/Nav";
import HomeMain from "./HomeMain/HomeMain";
import Footer from "../Footer/Footer";

const MainApp = () => {
	const [adduserData, setAddUserData] = useState(null);
	const [formSubmitted, setFormSubmitted] = useState(false);
	//* Getting user data
	useEffect(() => {
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
		GetData();
	}, []);
	return (
		<>
			<Nav />
			<HomeMain />
			<Footer />
			{!formSubmitted && <Form data={adduserData} setFormSubmitted={setFormSubmitted} />}
		</>
	);
};

export default MainApp;
