import React, { useEffect, useState } from "react";
import Form from "../Login/Form";
import { userData } from "../helper/helper";
import Nav from "./Nav/Nav";
import HomeMain from "./HomeMain/HomeMain";

const MainApp = () => {
	const [adduserData, setAddUserData] = useState(null);
	const [formSubmitted, setFormSubmitted] = useState(false);
	//* Getting user data
	useEffect(() => {
		const checkFormSubmitted = localStorage.getItem("form");
		if (checkFormSubmitted === "true") {
			setFormSubmitted(true);
		} else {
			setFormSubmitted(false);
		}
		const GetData = async () => {
			try {
				const { data, status } = await userData();
				if (status === 201) {
					setAddUserData(data);
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
			{!formSubmitted && <Form data={adduserData} setFormSubmitted={setFormSubmitted} />}
		</>
	);
};

export default MainApp;
