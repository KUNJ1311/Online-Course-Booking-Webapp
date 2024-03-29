import React from "react";
import Form from "./Form";

const RegisterForm = ({ data, setFormSubmitted }) => {
	return (
		<section className="sec">
			<div className="scroll-container">
				<div className={`reg-container fade-in`} id="container">
					<Form data={data} setFormSubmitted={setFormSubmitted} name={"Registration Form"} update={"Submit"} />
				</div>
			</div>
		</section>
	);
};

export default RegisterForm;
