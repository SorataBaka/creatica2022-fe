import Head from "next/head";

export default function HeadComponent({ headdata }) {
	const { title, description, url } = headdata;
	if (!title || !description || !url)
		throw new Error("Missing title, description or url");
	return (
		<Head>
			<title>{`BetterHelp - ${title}`}</title>
			<meta
				name="description"
				content={`${description} - Safe and secure forum for your inner fights and battles.`}
			/>
			<link rel="icon" href="/favicon.ico" />

			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="googlebot" content="index, follow" />
			<meta name="robots" content="index, follow" />
			<meta name="google" content="nopagereadaloud" />
			<meta name="title" content={`BetterHelp - ${title}`} />

			<meta property="og:type" content="website" />
			<meta property="og:url" content={url} />
			<meta property="og:title" content={`BetterHelp - ${title}`} />
			<meta
				property="og:description"
				content={`${description} - Safe and secure forum for your inner fights and battles.`}
			/>
			<meta property="og:image" content="/api/assets/snapshot.png" />

			<meta name="theme-color" content="#000343" />
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={url} />
			<meta property="twitter:title" content={`BetterHelp - ${title}`} />
			<meta
				property="twitter:description"
				content={`${description} - Safe and secure forum for your inner fights and battles.`}
			/>
			<meta property="twitter:image" content="/api/assets/snapshot.png" />
		</Head>
	);
}
