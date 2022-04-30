import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const checkTokens = async () => {
		const token = localStorage.getItem("token");
		const expiry = localStorage.getItem("expiry");
		if (!token || !expiry) return router.push("/login");
		if (Date.now() > new Date(expiry)) {
			const refresh = localStorage.getItem("refresh");
			if (!refresh) return router.push("/login");
			const data = await fetch(
				"https://creatica2022-be-aotynourea-as.a.run.app/api/v1/auth/refresh",
				{
					method: "POST",
					body: JSON.stringify({
						refresh_token: refresh,
					}),
				}
			).catch();
			const jsondata = await data.json();
			if (!jsondata || jsondata.status !== 200) {
				return router.push("/login");
			}
			localStorage.setItem("token", jsondata.token.access_token);
			localStorage.setItem("expiry", jsondata.token.expire_at);
			localStorage.setItem("refresh", jsondata.token.refresh_token);
		}
	};
	useEffect(() => {
		if (!Component.pageBehaviour?.avoidtokencheck) checkTokens();
	});

	return (
		<>
			<Layout
				headdata={Component.pageInformation}
				pagebehaviour={Component.pageBehaviour}
			>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}

MyApp.pageInformation = {
	title: "Application",
	description: "This is the application page",
	url: "https://betterhelp.org/",
};
export default MyApp;
