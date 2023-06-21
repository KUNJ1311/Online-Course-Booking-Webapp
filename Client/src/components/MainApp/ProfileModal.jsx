import React from "react";

const ProfileModal = ({ onClose }) => {
	return (
		<section className="sec" onClick={onClose}>
			<div className="scroll-container">
				<div className={`container fade-in`} id="container" onClick={(e) => e.stopPropagation()}>
					hi
				</div>
			</div>
		</section>
	);
};

export default ProfileModal;
