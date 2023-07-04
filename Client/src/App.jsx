import Home from "./components/Home/Home";
import MainApp from "./components/MainApp/MainApp";
import AdminHome from "./components/Admin/AdminHome/AdminHome";
import Login from "./components/Login/Login";
import AdminLogin from "./components/Admin/AdminLogin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserState from "./components/context/UserState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthorizeUser } from "./components/middleware/auth";
import { AuthorizeAdmin } from "./components/middleware/adminauth";
function App() {
	return (
		<>
			<UserState>
				<Router>
					{/* Alert */}
					<ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable pauseOnHover theme="light" />
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/admin" element={<AdminLogin />} />
						{/* Authorized Routes */}
						<Route
							path="/mainapp"
							element={
								<AuthorizeUser>
									<MainApp />
								</AuthorizeUser>
							}
						/>
						{/* Authorized Admin Routes */}
						<Route
							path="/adminapp"
							element={
								<AuthorizeAdmin>
									<AdminHome />
								</AuthorizeAdmin>
							}
						/>
					</Routes>
				</Router>
			</UserState>
		</>
	);
}

export default App;
