import style from "../styles/Login.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

function LoginScreen() {
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
	const handleRegister = () => {
		router.push("/register");
	};

	const login = async () => {
		if (!passwordRegex.test(password))
			return toast("Invalid password", { type: "error" });
		const data = await fetch(
			"https://creatica2022-be-aotynourea-as.a.run.app/api/v1/auth/login",
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
		if (!jsondata || jsondata.status !== 200) {
			return toast("Login failed. Are you sure you are registered?", {
				type: "error",
			});
		}
		localStorage.setItem("token", jsondata.token.access_token);
		localStorage.setItem("expiry", jsondata.token.expire_at);
		localStorage.setItem("refresh", jsondata.token.refresh_token);
		toast("Login successful.", { type: "success" });
		return router.push("/");
	};

	return (
		<>
			<div className={style.loginBox}>
				<h2>Login</h2>
				<form
					className={style.form}
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<input
						type="text"
						name="username"
						placeholder="Email"
						className={"form-control " + style.input}
						onChange={handleUsername}
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						autoComplete="current-password"
						className={"form-control " + style.input}
						onChange={handlePassword}
					/>
					<input
						type="submit"
						className={style.submit + " btn btn-primary"}
						value="Login"
						onClick={login}
					/>
				</form>
				<p className={style.registerSpan} onClick={handleRegister}>
					Don&apos;t have an account? Register <span>here!</span>
				</p>
			</div>
		</>
	);
}
LoginScreen.pageInformation = {
	title: "Login",
	description: "Login to your account",
	url: "https://betterhelp.org/login",
};
LoginScreen.pageBehaviour = {
	noheader: true,
	nofooter: true,
	avoidtokencheck: true,
};

export default LoginScreen;
