import React, { useState } from "react";
import "./login.css";
import Signup from "./Signup";
import Login from "./Login";
import OTP from "./OTP";
import ForgetPass from "./ForgetPass";
import ChangePass from "./ChangePass";

export default function MainModal({ onClose }) {
	const [isActive, setIsActive] = useState(false);
	const [isScaled, setIsScaled] = useState(false);
	const [registerValue, setRegisterValue] = useState(false);
	const [forgetValue, setForgetValue] = useState(false);
	const [sendOTP, setSendOTP] = useState(false);
	const [rePassword, setRePassword] = useState(false);

	function togglePanel() {
		setIsActive(!isActive);
		setIsScaled(!isScaled);
	}

	const OnRegister = (value) => {
		setRegisterValue(value);
	};

	const OnForget = (value) => {
		setForgetValue(value);
	};

	const OnSend = (value) => {
		setSendOTP(value);
	};

	const RePass = () => {
		setRePassword(true);
	};

	return (
		<>
			<section className="sec" onClick={onClose}>
				<div className={`container fade-in ${isActive ? "right-panel-active" : ""}`} id="container" onClick={(e) => e.stopPropagation()}>
					{registerValue ? <OTP side={"sign-up-container"} /> : <Signup OnRegister={OnRegister} />}
					{forgetValue ? sendOTP ? rePassword ? <ChangePass /> : <OTP side={"sign-in-container"} handleVerify={RePass} /> : <ForgetPass OnSend={OnSend} /> : <Login OnForget={OnForget} />}
					<div className="overlay-container" id="overlayCon">
						<div className="overlay">
							<div className="overlay-panel overlay-left">
								<h1 className="h">Welcome Back!</h1>
								<p>To keep connected with us please login with your personal info</p>
								<button className="robtn">Login In</button>
							</div>
							<div className="overlay-panel overlay-right">
								<h1 className="h">Hello, Friend!</h1>
								<p>Enter your personal details and start journey with us</p>
								<button className="robtn">Register</button>
							</div>
						</div>
						<button className="overlayBtn" onClick={togglePanel} id="overlayBtn"></button>
					</div>
				</div>
			</section>
		</>
	);
}
