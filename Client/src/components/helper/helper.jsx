import axios from "axios";

const host = "http://localhost:8080";
//* Make Api Requests

//? authenticate function
export async function authentication(email) {
	try {
		return await axios.post(`${host}/api/authenticate`, { email });
	} catch (error) {
		return { error: "Email doesn't exist..!" };
	}
}

//? Check user in database
export async function checkUser(email, username) {
	try {
		const { status, data } = await axios.post(`${host}/api/checkuser`, { email, username });
		return { status, msg: data.msg };
	} catch (error) {
		return { error };
	}
}

//? Get User Details
export const getUser = async ({ email }) => {
	try {
		const { data } = await axios.get(`${host}/api/user/${email}`);
		return { data };
	} catch (error) {
		return { error: "Password doesn't Match..!" };
	}
};

//? register user function
export const registerUser = async (credentials) => {
	try {
		const {
			data: { msg },
			status,
		} = await axios.post(`${host}/api/register`, credentials);
		return { msg, status };
	} catch (error) {
		return Promise.reject({ error });
	}
};

//? login function
export const verifyPassword = async ({ email, password }) => {
	try {
		if (email) {
			const { data, status } = await axios.post(`${host}/api/login`, { email, password });
			return Promise.resolve({ data, status });
		}
	} catch (error) {
		return Promise.reject({ error: "Password doesn't Match..!" });
	}
};

//? update user function
export const regform = async (email, fullname, phone, college, address) => {
	const token = localStorage.getItem("coderToken");
	try {
		const { status } = await axios.post(
			"http://localhost:8080/api/registerform",
			{
				email,
				fullname,
				phone,
				college,
				address,
				formfill: true,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return Promise.resolve({ status });
	} catch (error) {
		return Promise.reject(error.response?.data?.message || "Something went wrong");
	}
};

//? generate OTP
export const generateOTP = async (email) => {
	try {
		const {
			status,
			data: { code, username },
		} = await axios.get(`${host}/api/generateOTP`, { params: { email } });
		//* send mail with the otp
		if (status === 201) {
			let text = code;
			let extra = `Verify and recover your password.`;
			await axios.post(`${host}/api/registerMail`, { username, userEmail: email, text, subject: "Password recovery OTP", extra });
		}
		return { msg: "Success" };
	} catch (error) {
		return Promise.reject(error);
	}
};

//? generate OTP for new User
export const generateOTPnewUser = async (email) => {
	try {
		const {
			status,
			data: { code },
		} = await axios.get(`${host}/api/generateOTP/newUser`, { params: { email } });
		//* send mail with the otp
		if (status === 201) {
			let text = code;
			let extra = `Hello, here is your OTP. Please use this OTP to complete your registration process.`;
			await axios.post(`${host}/api/registerMail`, { userEmail: email, text, subject: "OTP for registration process", extra });
			return { status, msg: "OTP has been sent to your email." };
		}
	} catch (error) {
		return Promise.reject({ error });
	}
};

//? verify OTP
export const verifyOTP = async ({ email, code }) => {
	try {
		const { data, status } = await axios.get(`${host}/api/verifyOTP`, { params: { email, code } });
		return { data, status };
	} catch (error) {
		return Promise.reject(error);
	}
};

//? verify OTP new user
export const verifyOTPnewuser = async ({ code }) => {
	try {
		const { data, status } = await axios.get(`${host}/api/verifyOTP/newuser`, { params: { code } });
		return { data, status };
	} catch (error) {
		return Promise.reject(error);
	}
};

//? reset password
export const resetPassword = async ({ email, password }) => {
	try {
		const { data, status } = await axios.put(`${host}/api/resetPassword`, { email, password });
		return Promise.resolve({ data, status });
	} catch (error) {
		return Promise.reject({ error });
	}
};

//? get user data
export const userData = async () => {
	try {
		const token = localStorage.getItem("coderToken");
		const { data, msg, status } = await axios.get(`${host}/api/userdata`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return Promise.resolve({ data, msg, status });
	} catch (error) {
		return Promise.reject({ error });
	}
};
//! Auth user
export const Auth = async () => {
	try {
		const token = localStorage.getItem("coderToken");
		const { msg, status } = await axios.post(`${host}/api/auth`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return Promise.resolve({ msg, status });
	} catch (error) {
		return Promise.reject({ error });
	}
};
//! Payment
export const checkoutHandler = async (amount) => {
	try {
		const token = localStorage.getItem("coderToken");
		const { data, status } = await axios.post(
			`${host}/payment/checkout`,
			{
				amount,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return Promise.resolve({ data, status });
	} catch (error) {
		return Promise.reject({ error });
	}
};
