import React from "react";
import { useSearchParams } from "react-router-dom";
import "./paymentsuccess.css";
const PaymentSuccess = ({ onClose }) => {
	const searchQuery = useSearchParams()[0];
	const referenceNum = searchQuery.get("reference");
	return (
		<div className="container-success fade-in">
			<div className="scroll-container">
				<div className="wrapperAlert">
					<div className="contentAlert">
						<div className="topHalf">
							<p>
								<svg viewBox="0 0 512 512" width="100" title="check-circle">
									<path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
								</svg>
							</p>
							<h1>Congratulations</h1>
							<ul className="bg-bubbles">
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
							</ul>
						</div>
						<div className="bottomHalf">
							<p>Thank you for your purchase! Your receipt has been successfully sent to your email address.</p>
							<p>
								<strong>Reference No. {referenceNum}</strong>
							</p>
							<button id="alertMO" onClick={onClose}>
								Done
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentSuccess;
