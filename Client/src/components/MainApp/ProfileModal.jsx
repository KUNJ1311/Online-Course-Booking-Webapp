import React from "react";
import Form from "../Login/Form";

const ProfileModal = ({ onClose, data, setFormSubmitted, handleFormSubmit }) => {
	return (
		<section className="sec" onClick={onClose}>
			<div className="scroll-container">
				<div className={`reg-container fade-in`} id="container" onClick={(e) => e.stopPropagation()}>
					<Form data={data} setFormSubmitted={setFormSubmitted} name={"Profile"} onCancle={onClose} update={"Update"} handleFormSubmit={handleFormSubmit} />
				</div>
			</div>
		</section>
	);
};

export default ProfileModal;
