import React, { useContext } from "react";
import { IoLockClosed } from "react-icons/io5";
import userContext from "../context/userContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { resetPassword, verifyPassword } from "../helper/helper";

const ChangePass = () => {
	const Navigate = useNavigate();
	const context = useContext(userContext);
	const { setCredentials, credentials, setShowModal } = context;
	const { password, repassword, email } = credentials;

	//* set email, password, re-enter password in credentials
	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	//* change pass func.
	const ChangePass = async (e) => {
		try {
			e.preventDefault();
			if (password === repassword) {
				const { data, status } = await resetPassword({ email, password });
				if (status === 201) {
					const { data, status } = await verifyPassword({ email, password });
					if (status === 200) {
						localStorage.setItem("coderToken", data.token);
						setShowModal(false);
						Navigate("/mainapp");
					}
					toast.success("Password Changed Successfully..!");
				} else {
					Navigate("/");
					toast.error(data?.error?.error || "Please, Try Again..!");
				}
			} else {
				toast.warn("Passwords doesn't match..!");
			}
		} catch (error) {
			toast.error(error?.error?.response?.data?.error || "Server Error..!");
		}
	};

	return (
		<>
			<div className="form-container sign-in-container">
				<form onSubmit={ChangePass} className="form-login">
					<h1 className="h">Change Password</h1>
					<span className="ac-line mb-4"></span>
					<div className="infield">
						<IoLockClosed className="icon-login" />
						<input onChange={onChange} value={credentials.password} name="password" type="password" placeholder="New Password" />
						<label></label>
					</div>
					<div className="infield mb-4">
						<IoLockClosed className="icon-login" />
						<input onChange={onChange} value={credentials.repassword} name="repassword" type="password" placeholder="Confirm Password" />
						<label></label>
					</div>
					<button type="submit" className="robtn">
						Change
					</button>
				</form>
			</div>
		</>
	);
};

export default ChangePass;
