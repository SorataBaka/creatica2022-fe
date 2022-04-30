import "../styles/globals.css";
import Layout from "../components/layout";
function MyApp({ Component, pageProps }) {
	return (
		<>
			<Layout headdata={Component.pageInformation}>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}

export default MyApp;
