import React, { useEffect, useState } from "react";
import { RiUser3Fill, RiPhoneFill } from "react-icons/ri";
import { MdMail } from "react-icons/md";
import { FaUserCircle, FaUniversity } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import avatar from "./avatar.svg";
import { regform } from "../helper/helper";
import { toast } from "react-toastify";

const Form = ({ data, setFormSubmitted, name, update, onCancle }) => {
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
				fullname: data.fullname || "",
				address: data.address || "",
				college: data.college || "",
				phone: data.phone || "",
			});
		}
	}, [data]);
	const { email, fullname, phone, college, address } = credentials;
	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			if (fullname && address && college && phone && phone.toString().length === 10) {
				setFormSubmitted(true);
				const { status } = await regform(email, fullname, phone, college, address);
				if (status === 200) {
					toast.info("Congratulations! Your information updated successfully.");
					onCancle();
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
		<div className="reg-form-container">
			<form onSubmit={handleSubmit} className="form-login">
				<h1 className="h">{name}</h1>
				<span className="ac-line"></span>
				<div className="social-container">
					<img src={avatar} alt="" width="100px" height="100px" />
				</div>
				<div className="infield">
					<RiUser3Fill className="icon-login" />
					<input type="text" readOnly value={credentials.username} name="username" placeholder="Username" />
					<span className="lable-main"></span>
				</div>
				<div className="infield">
					<MdMail className="icon-login" />
					<input type="email" readOnly value={credentials.email} placeholder="Email" name="email" />
					<span className="lable-main"></span>
				</div>
				<div className="infield">
					<FaUserCircle className="icon-login" />
					<input type="text" onChange={onChange} value={credentials.fullname} name="fullname" placeholder="Full Name" />
					<span className="lable-main"></span>
				</div>
				<div className="infield">
					<RiPhoneFill className="icon-login" />
					<input type="number" onChange={onChange} value={credentials.phone} name="phone" placeholder="Phone No." />
					<span className="lable-main"></span>
				</div>
				<div className="infield">
					<FaUniversity className="icon-login" />
					<input type="text" onChange={onChange} value={credentials.college} name="college" placeholder="College" />
					<span className="lable-main"></span>
				</div>
				<div className="infield">
					<IoLocationSharp className="icon-login" />
					<textarea rows={3} type="text" onChange={onChange} value={credentials.address} name="address" placeholder="Address" />
					<span className="lable-main"></span>
				</div>
				<div className="btn2">
					<button className="robtn mt-2 mr-4 btnn" type="submit">
						{update}
					</button>
					{onCancle && (
						<button className="robtn mt-2 red-btn" type="button" onClick={onCancle}>
							Cancle
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default Form;
