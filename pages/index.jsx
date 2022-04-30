import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Home() {
	const router = useRouter();
	useEffect(() => {
		const token = localStorage.getItem("token");
		const expiry = localStorage.getItem("expiry");
		if (!token || !expiry) return router.push("/login");
		if (Date.now() > expiry) {
			return router.push("/login");
		}
	}, [router]);
	return (
		<>
			<h1>This is the main body</h1>
		</>
	);
}
Home.pageInformation = {
	title: "Home",
	description: "This is the home page",
	url: "https://betterhelp.org",
};
