import { Navigate } from "react-router-dom";
import { adminAuth } from "../helper/adminhelper";

export const AuthorizeAdmin = async ({ children }) => {
	const token = localStorage.getItem("adminToken");
	if (!token) {
		return <Navigate to={"/"} replace={true} />;
	}
	const { status } = await adminAuth(token);
	if (status !== 200) {
		return <Navigate to={"/"} replace={true} />;
	}
	return children;
};
