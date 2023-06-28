import React, { useEffect, useState } from "react";
import { userData } from "../helper/helper";
import Nav from "./Nav/Nav";
import HomeMain from "./HomeMain/HomeMain";
import Footer from "../Footer/Footer";
import RegisterForm from "../Login/RegisterForm";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentSuccess from "./Payment/PaymentSuccess";

const MainApp = () => {
	const [adduserData, setAddUserData] = useState(null);
	const [formSubmitted, setFormSubmitted] = useState(true);
	const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);
	const location = useLocation();
	const Navigate = useNavigate();

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

	const handleFormSubmit = () => {
		setFormSubmitted(false);
	};

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const razorpayPaymentId = queryParams.get("reference");

		if (razorpayPaymentId) {
			setShowPaymentSuccessModal(true);
		}
	}, [location.search]);

	const closeModal = () => {
		setShowPaymentSuccessModal(false);
		Navigate("/mainapp");
	};

	return (
		<>
			<Nav data={adduserData} setFormSubmitted={setFormSubmitted} handleFormSubmit={handleFormSubmit} />
			<HomeMain />
			<div id="about">
				<Footer />
			</div>
			{!formSubmitted && <RegisterForm data={adduserData} setFormSubmitted={setFormSubmitted} handleFormSubmit={handleFormSubmit} />}
			{showPaymentSuccessModal && <PaymentSuccess onClose={closeModal} />}
		</>
	);
};

export default MainApp;
