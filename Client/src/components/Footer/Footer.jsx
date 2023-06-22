import React from "react";
import insta from "./svg/instagram.svg";
import twit from "./svg/twitter.svg";
import face from "./svg/facebook.svg";
import linke from "./svg/linkedin.svg";
import "./footer.css";
import { IoLocationSharp } from "react-icons/io5";
import { RiPhoneFill } from "react-icons/ri";
import { MdMail } from "react-icons/md";

const Footer = () => {
	return (
		<footer className="footer-distributed">
			<div className="footer-left">
				<h3>
					Company<span>logo</span>
				</h3>

				<p className="footer-links">
					<a href="#" className="link-1">
						Home
					</a>
					<a href="#"> About</a>
					<a href="#"> Contact</a>
				</p>

				<p className="footer-company-name">Company Name © 2015</p>
			</div>

			<div className="footer-center">
				<div>
					<IoLocationSharp className="icon-i" />
					<p>
						<span>444 S. Cedros Ave</span> Solana Beach, California
					</p>
				</div>
				<div>
					<RiPhoneFill className="icon-i" />
					<p>+1.555.555.5555</p>
				</div>
				<div>
					<MdMail className="icon-i" />
					<p>
						<a href="mailto:support@company.com">support@company.com</a>
					</p>
				</div>
			</div>

			<div className="footer-right">
				<p className="footer-company-about">
					<span>About the company</span>
					Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
				</p>

				<div className="footer-icons">
					<img src={insta} alt="" width={27} height={27} />
					<img src={twit} alt="" width={27} height={27} />
					<img src={face} alt="" width={27} height={27} />
					<img src={linke} alt="" width={27} height={27} />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
