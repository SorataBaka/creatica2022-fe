import Head from "next/head";

export default function HeadComponent({ headdata }) {
	return (
		<Head>
			<title>{`BetterHelp - ${headdata?.title}`}</title>
			<meta
				name="description"
				content={`${headdata?.description} - Safe and secure forum for your inner fights and battles.`}
			/>
			<link rel="icon" href="/favicon.ico" />

			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="googlebot" content="index, follow" />
			<meta name="robots" content="index, follow" />
			<meta name="google" content="nopagereadaloud" />
			<meta name="title" content={`BetterHelp - ${headdata?.title}`} />

			<meta property="og:type" content="website" />
			<meta property="og:url" content={headdata?.url} />
			<meta property="og:title" content={`BetterHelp - ${headdata?.title}`} />
			<meta
				property="og:description"
				content={`${headdata?.description} - Safe and secure forum for your inner fights and battles.`}
			/>
			<meta property="og:image" content="/meta.png" />

			<meta name="theme-color" content="#000343" />
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={headdata?.url} />
			<meta
				property="twitter:title"
				content={`BetterHelp - ${headdata?.title}`}
			/>
			<meta
				property="twitter:description"
				content={`${headdata?.description} - Safe and secure forum for your inner fights and battles.`}
			/>
			<meta property="twitter:image" content="/meta.png" />
		</Head>
	);
}
