import { Navigate } from "react-router-dom";

export const AuthorizeUser = ({ children }) => {
	const token = localStorage.getItem("coderToken");
	if (!token) {
		return <Navigate to={"/"} replace={true} />;
	}
	return children;
};
