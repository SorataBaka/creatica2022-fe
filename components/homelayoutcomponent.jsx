import { FaHouseUser } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import style from "../styles/Homelayout.module.css";
import { useRouter } from "next/router";
function HomeLayoutComponent({ children }) {
	const router = useRouter();
	const handleSidebarClick = (path) => {
		window.location.replace(path);
	};
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("refresh");
		localStorage.removeItem("expiry");
		router.push("/login");
	};
	return (
		<div className={style.baseLayout}>
			<div className={style.sideBar}>
				<h1
					className={style.logo}
					onClick={() => {
						handleSidebarClick("/");
					}}
				>
					BetterHelp
				</h1>
				<div className={style.buttonGroup}>
					<div
						className={style.sidebarButton}
						onClick={() => {
							handleSidebarClick("/");
						}}
					>
						<FaHouseUser size={"33px"} />
						<p className={style.sidebarButtonText}>Home</p>
					</div>
					<div
						className={style.sidebarButton}
						onClick={() => {
							handleSidebarClick("/profile");
						}}
					>
						<MdAccountCircle size={"33px"} />
						<p className={style.sidebarButtonText}>Profile</p>
					</div>
				</div>
				<button
					className={style.logoutbutton + " btn btn-danger"}
					onClick={handleLogout}
				>
					Log Out
				</button>
			</div>
			<div className={style.mainContent}>{children}</div>
		</div>
	);
}
export default HomeLayoutComponent;
