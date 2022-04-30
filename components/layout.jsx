import HeadComponent from "./headcomponent";
import FooterComponent from "./footercomponent";
import HeaderComponent from "./headercomponent";
import React from "react";
export default function Layout({ headdata, pagebehaviour, children }) {
	return (
		<>
			<HeadComponent headdata={headdata} />
			{pagebehaviour?.noheader ? null : <HeaderComponent />}
			<main>{children}</main>
			{pagebehaviour?.nofooter ? null : <FooterComponent />}
		</>
	);
}
