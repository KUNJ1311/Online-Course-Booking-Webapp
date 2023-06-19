import React, { useContext } from "react";
import { MdMail } from "react-icons/md";
import userContext from "../context/userContext";
import { generateOTP } from "../helper/helper";
import { toast } from "react-toastify";

const ForgetPass = ({ OnSend }) => {
	const context = useContext(userContext);
	const { setCredentials, credentials } = context;
	const { email } = credentials;

	//* set email to credentials
	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	//* send otp to user
	const handleSend = async (e) => {
		try {
			e.preventDefault();
			if (email) {
				try {
					await toast.promise(generateOTP(email), {
						pending: "Sending OTP to your email...",
						success: "Success! Your OTP has been sent.",
					});
					OnSend(true);
				} catch (error) {
					return toast.warn(error?.response?.data?.error || "Try Again..");
				}
			} else {
				return toast.warn("Please enter your details.");
			}
		} catch (error) {
			toast.error("Server Error! Please, Try Again..");
		}
	};

	return (
		<>
			<div className="form-container sign-in-container">
				<form onSubmit={handleSend} className="form-login">
					<h1 className="h">Forget Password</h1>
					<span className="ac-line"></span>
					<span className="sm-text pt-5 pb-2">Enter your E-mail address.</span>
					<div className="infield">
						<MdMail className="icon-login" />
						<input onChange={onChange} type="email" placeholder="Email" name="email" value={credentials.email} />
						<label></label>
					</div>
					<button type="submit" className="robtn" style={{ marginTop: "15px" }}>
						Send OTP
					</button>
				</form>
			</div>
		</>
	);
};

export default ForgetPass;
