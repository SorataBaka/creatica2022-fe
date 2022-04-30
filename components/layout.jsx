import HeadComponent from "./headcomponent";
import FooterComponent from "./footercomponent";
import HeaderComponent from "./headercomponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

import "bootstrap/dist/css/bootstrap.css";
export default function Layout({ headdata, pagebehaviour, children }) {
	return (
		<>
			<ToastContainer />
			<HeadComponent headdata={headdata} />
			{pagebehaviour?.noheader ? null : <HeaderComponent />}
			<main>{children}</main>
			{pagebehaviour?.nofooter ? null : <FooterComponent />}
		</>
	);
}
