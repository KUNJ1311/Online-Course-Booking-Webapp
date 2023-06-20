import React, { useEffect, useState } from "react";
import Form from "../Login/Form";
import { userData } from "../helper/helper";

const MainApp = () => {
	const [adduserData, setAddUserData] = useState(null);
	const [formSubmitted, setFormSubmitted] = useState(false);
	//* Getting user data
	useEffect(() => {
		const checkFormSubmitted = localStorage.getItem("form");
		if (checkFormSubmitted) {
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
			<div>MainApp</div>
			{!formSubmitted && <Form data={adduserData} setFormSubmitted={setFormSubmitted} />}
		</>
	);
};

export default MainApp;
