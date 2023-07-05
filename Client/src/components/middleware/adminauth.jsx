import { Navigate } from "react-router-dom";

export const AuthorizeAdmin = ({ children }) => {
	const token = localStorage.getItem("adminToken");
	if (!token) {
		return <Navigate to={"/"} replace={true} />;
	}
	return children;
};
