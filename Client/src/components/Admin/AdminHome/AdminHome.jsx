import React from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Link, animateScroll as scroll } from "react-scroll";
import { toast } from "react-toastify";

const AdminHome = () => {
	const Navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("coderToken");
		Navigate("/");
		toast.success("You have successfully logged out.");
	};
	return (
		<div className="adminhome">
			<nav className="navbar" onClick={(e) => e.stopPropagation()}>
				<div className="nav-container">
					<Link
						to=""
						onClick={() => {
							scroll.scrollToTop();
						}}
						smooth={true}
						duration={500}
						className="nav-logo"
					>
						DC4 IT SOLUTIONS
					</Link>
					<ul>
						<li className="p-ico">
							<RiLogoutCircleLine className="logout" onClick={handleLogout} />
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default AdminHome;
