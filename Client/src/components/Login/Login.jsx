import React, { useContext, useState } from "react";
import avatar from "./avatar.svg";
import { useNavigate } from "react-router-dom";
import { IoLockClosed } from "react-icons/io5";
import { MdMail } from "react-icons/md";
import { verifyPassword } from "../helper/helper";
import { toast } from "react-toastify";
import userContext from "../context/userContext";

const Login = ({ OnForget }) => {
	const context = useContext(userContext);
	const { setShowModal } = context;
	let Navigate = useNavigate();
	const [credentials, setCredentials] = useState({ email: "", password: "" });

	//* open 'send otp using registered email' component on forgetpassword click
	const handleForget = () => {
		OnForget(true);
	};

	//* login user and save token in localstorage
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const { data } = await verifyPassword(credentials);
			setShowModal(false);
			localStorage.setItem("coderToken", data.token);
			Navigate("/mainapp");
			toast.success("Logged in successfully..!");
		} catch (error) {
			toast.error("Wrong Credentials..!");
		}
	};

	//* set values of input feild on change
	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	return (
		<div className="form-container sign-in-container">
			<form action="#" className="form-login" onSubmit={handleLogin}>
				<h1 className="h">Welcome Back!</h1>
				<span className="ac-line"></span>
				<div className="social-container">
					<img src={avatar} alt="" width="100px" height="100px" />
				</div>
				<div className="infield">
					<MdMail className="icon-login" />
					<input onChange={onChange} type="email" placeholder="Email" name="email" value={credentials.email} />
					<span className="lable-main"></span>
				</div>
				<div className="infield">
					<IoLockClosed className="icon-login" />
					<input onChange={onChange} name="password" type="password" value={credentials.password} placeholder="Password" />
					<span className="lable-main"></span>
				</div>
				<span className="forgot">
					Forgot Password?<span onClick={handleForget}> Recover Now</span>
				</span>
				<button type="submit" className="robtn">
					Login In
				</button>
			</form>
		</div>
	);
};

export default Login;
