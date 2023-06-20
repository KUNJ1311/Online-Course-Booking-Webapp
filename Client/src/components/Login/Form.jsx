import React, { useState, useEffect } from "react";
import { RiUser3Fill, RiPhoneFill } from "react-icons/ri";
import { MdMail } from "react-icons/md";
import { FaUserCircle, FaUniversity } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import avatar from "./avatar.svg";
import { regform } from "../helper/helper";
import { toast } from "react-toastify";

const Form = ({ data, setFormSubmitted }) => {
	const [credentials, setCredentials] = useState({
		email: "",
		username: "",
		fullname: "",
		address: "",
		college: "",
		phone: "",
	});

	useEffect(() => {
		if (data) {
			setCredentials({
				email: data.email || "",
				username: data.username || "",
				fullname: "",
				address: "",
				college: "",
				phone: "",
			});
		}
	}, [data]);
	const { email, fullname, phone, college, address } = credentials;
	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			if (fullname && address && college && phone && phone.length === 10) {
				const { status } = await regform(email, fullname, phone, college, address);
				if (status === 200) {
					localStorage.setItem("form", true);
					toast.info("Congratulations! Your information updated successfully.");
					setFormSubmitted(true);
				} else {
					toast.error("Try Again..");
				}
			} else {
				toast.warn("Enter valid details");
			}
		} catch (error) {
			toast.error("Something went wrong!!");
		}
	};

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	return (
		<section className="sec">
			<div className="scroll-container">
				<div className={`reg-container fade-in`} id="container">
					<div className="reg-form-container">
						<form onSubmit={handleSubmit} className="form-login">
							<h1 className="h">Registration Form</h1>
							<span className="ac-line"></span>
							<div className="social-container">
								<img src={avatar} alt="" width="100px" height="100px" />
							</div>
							<div className="infield">
								<RiUser3Fill className="icon-login" />
								<input type="text" readOnly value={credentials.username} name="username" placeholder="Username" />
								<label></label>
							</div>
							<div className="infield">
								<MdMail className="icon-login" />
								<input type="email" readOnly value={credentials.email} placeholder="Email" name="email" />
								<label></label>
							</div>
							<div className="infield">
								<FaUserCircle className="icon-login" />
								<input type="text" onChange={onChange} value={credentials.fullname} name="fullname" placeholder="Full Name" />
								<label></label>
							</div>
							<div className="infield">
								<RiPhoneFill className="icon-login" />
								<input type="number" onChange={onChange} value={credentials.phone} name="phone" placeholder="Phone No." />
								<label></label>
							</div>
							<div className="infield">
								<FaUniversity className="icon-login" />
								<input type="text" onChange={onChange} value={credentials.college} name="college" placeholder="College" />
								<label></label>
							</div>
							<div className="infield">
								<IoLocationSharp className="icon-login" />
								<textarea rows={3} type="text" onChange={onChange} value={credentials.address} name="address" placeholder="Address" />
								<label></label>
							</div>
							<button className="robtn mt-2" type="submit">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Form;
