import "../styles/globals.css";
import Layout from "../components/layout";
import { useEffect } from "react";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }) {
	const router = useRouter();

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

export default MyApp;
