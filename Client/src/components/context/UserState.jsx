import { useState } from "react";
import UserContext from "./userContext";
import { checkUser, generateOTPnewUser } from "../helper/helper";
import { toast } from "react-toastify";

const UserState = (props) => {
	const [credentials, setCredentials] = useState({ email: "", password: "", username: "", repassword: "" });
	const { email, password, username } = credentials;
	const [showModal, setShowModal] = useState(false);

	//* Get Started to login
	const handleClick = () => {
		setShowModal(true);
	};

	//* Close login page
	const handleCloseModal = () => {
		setShowModal(false);
	};
	const modal = () => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				handleCloseModal();
			}
		};
		if (showModal) {
			document.addEventListener("keydown", handleKeyDown);
		} else {
			document.removeEventListener("keydown", handleKeyDown);
		}
	};

	//* Register user
	const Register = async ({ OnRegister }) => {
		try {
			if (email && username && password) {
				const response = await checkUser(email, username);
				if (response.status === 200) {
					await toast.promise(generateOTPnewUser(email), {
						pending: "Sending OTP to your email...",
						success: "Success! Your OTP has been sent.",
						error: "Unable to send OTP. Please try again..",
					});
					OnRegister(true);
				} else {
					toast.error(response.error.response.data.msg);
				}
			} else {
				toast.warn("Please enter your details.");
			}
		} catch (error) {
			return { error };
		}
	};
	return <UserContext.Provider value={{ credentials, setCredentials, Register, modal, handleClick, setShowModal, showModal, handleCloseModal }}>{props.children}</UserContext.Provider>;
};
export default UserState;
