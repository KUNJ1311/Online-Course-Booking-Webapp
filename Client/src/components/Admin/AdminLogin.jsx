import React, { useEffect, useState } from "react";
import avatar from "../Login/avatar.svg";
import { useNavigate } from "react-router-dom";
import { IoLockClosed } from "react-icons/io5";
import { MdMail } from "react-icons/md";
import { validatePassword } from "../helper/helper";
import { toast } from "react-toastify";
import { adminLogin } from "../helper/adminhelper";

const AdminLogin = () => {
	let Navigate = useNavigate();
	const [credentials, setCredentials] = useState({ email: "", password: "" });

	//* login user and save token in localstorage
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			if (validatePassword(credentials.password)) {
				const { data } = await adminLogin(credentials);
				localStorage.setItem("adminToken", data.token);
				Navigate("/adminapp");
				toast.success("Logged in successfully..!");
			}
		} catch (error) {
			toast.error("Wrong Credentials..!");
		}
	};

	//* set values of input feild on change
	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	//* Check Token to redirect user to main app
	useEffect(() => {
		async function checkToken() {
			const token = localStorage.getItem("adminToken");
			if (token) {
				Navigate("/adminapp");
			}
		}
		checkToken();
	});
	return (
		<div className="d-flex second-font" style={{ width: "100vw", height: "100vh" }}>
			<div className="scroll-container" style={{ overflowY: "auto" }}>
				<div className="reg-container" style={{ height: "450px" }}>
					<form action="#" className="form-login" onSubmit={handleLogin}>
						<h1 className="h">Welcome Back!</h1>
						<span className="ac-line"></span>
						<div className="social-container pt-2">
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
						<button type="submit" className="robtn mt-3">
							Login In
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AdminLogin;
