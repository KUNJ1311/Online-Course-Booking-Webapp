import Home from "./components/Home/Home";
import MainApp from "./components/MainApp/MainApp";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserState from "./components/context/UserState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthorizeUser } from "./components/middleware/auth";
import About from "./components/MainApp/About";
import Profile from "./components/MainApp/Profile";
import Contact from "./components/MainApp/Contact";
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
						{/* Authorized Routes */}
						<Route
							path="/mainapp"
							element={
								<AuthorizeUser>
									<MainApp />
								</AuthorizeUser>
							}
						/>
						<Route
							path="/about"
							element={
								<AuthorizeUser>
									<About />
								</AuthorizeUser>
							}
						/>
						<Route
							path="/contact"
							element={
								<AuthorizeUser>
									<Contact />
								</AuthorizeUser>
							}
						/>
						<Route
							path="/profile"
							element={
								<AuthorizeUser>
									<Profile />
								</AuthorizeUser>
							}
						/>
					</Routes>
				</Router>
			</UserState>
		</>
	);
}

export default App;
