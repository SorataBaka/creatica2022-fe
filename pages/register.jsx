import { FaChevronLeft } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import style from "../styles/Register.module.css";
function RegisterScreen() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
	const handleBack = () => {
		router.push("/login");
	};
	const handleusername = (e) => {
		setUsername(e.target.value);
	};
	const handlepassword = (e) => {
		setPassword(e.target.value);
	};
	const register = async () => {
		if (!passwordRegex.test(password))
			return toast("Invalid password", { type: "error" });
		const data = await axios.request({
			url: "https://creatica2022-be-aotynourea-as.a.run.app/api/v1/register",
			data: {
				username: username,
				password: password,
			},
		});
		if (data?.status !== 200) {
			return toast(
				"Registration failed. Are you sure you are not already registered?",
				{ type: "error" }
			);
		}
		localStorage.setItem("token", data.token.access_token);
		localStorage.setItem("expiry", data.data.expire_at);
		toast("Registration successful.", { type: "success" });
		return router.push("/");
	};
	return (
		<>
			<div className={style.backButton} onClick={handleBack}>
				<FaChevronLeft size={30} />
			</div>
			<h1>This is the register screen</h1>
		</>
	);
}
RegisterScreen.pageInformation = {
	title: "Register",
	description: "Register to your account",
	url: "https://betterhelp.org/register",
};
RegisterScreen.pageBehaviour = {
	noheader: true,
	nofooter: true,
};
export default RegisterScreen;
