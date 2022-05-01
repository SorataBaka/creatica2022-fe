import style from "../styles/Login.module.css";
import registerStyle from "../styles/Register.module.css";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

function RegisterScreen() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const router = useRouter();

	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

	const handleUsername = (e) => {
		setUsername(e.target.value);
	};
	const handlePassword = (e) => {
		setPassword(e.target.value);
	};
	const handleLogin = () => {
		router.push("/login");
	};

	const register = async () => {
		if (!passwordRegex.test(password))
			return toast(
				"Invalid password. Password must contain atleast 1 Uppercase, 1 Lowercase, and 1 Number.",
				{ type: "error" }
			);
		const data = await fetch(
			"https://creatica2022-be-aotynourea-as.a.run.app/api/v1/auth/register",
			{
				method: "POST",
				body: JSON.stringify({
					username: username,
					password: password,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			}
		).catch();
		const jsondata = await data.json();
		if (!jsondata || jsondata.status !== 201) {
			return toast("Register failed. Perhaps your username has been taken?", {
				type: "error",
			});
		}
		toast("Register successful.", { type: "success" });
		return router.push("/login");
	};

	return (
		<>
			<div className={registerStyle.backButton}>
				<FaChevronLeft onClick={handleLogin} size={30} />
			</div>
			<div className={style.loginBox}>
				<h2>Register</h2>
				<form
					className={style.form}
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<input
						type="text"
						name="username"
						placeholder="Username"
						className={"form-control " + style.input}
						onChange={handleUsername}
						autoComplete="off"
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						autoComplete="off"
						className={"form-control " + style.input}
						onChange={handlePassword}
					/>
					<input
						type="submit"
						className={style.submit + " btn btn-primary"}
						value="Register"
						onClick={register}
					/>
				</form>
				<p className={style.registerSpan} onClick={handleLogin}>
					Already have an account? Login <span>here!</span>
				</p>
			</div>
		</>
	);
}
RegisterScreen.pageInformation = {
	title: "Register",
	description: "Register an account",
	url: "https://betterhelp.org/register",
};
RegisterScreen.pageBehaviour = {
	noheader: true,
	nofooter: true,
	avoidtokencheck: true,
};

export default RegisterScreen;
