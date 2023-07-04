import axios from "axios";
const host = process.env.REACT_APP_HOST;

//? login function
export const adminLogin = async ({ email, password }) => {
	try {
		if (email) {
			const { data, status } = await axios.post(`${host}/api/admin/login`, { email, password });
			return Promise.resolve({ data, status });
		}
	} catch (error) {
		return Promise.reject({ error: "Password doesn't Match..!" });
	}
};

export const adminAuth = async ({ token }) => {
	try {
		const { status } = await axios.post(`${host}/api/admin/auth`, { token });
		return Promise.resolve({ status });
	} catch (error) {
		return Promise.reject({ error: "Try Again...!" });
	}
};
