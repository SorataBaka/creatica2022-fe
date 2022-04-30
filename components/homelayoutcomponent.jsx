import style from "../styles/Homelayout.module.css";
function HomeLayoutComponent({ children }) {
	return (
		<div className={style.baseLayout}>
			<div className={style.sideBar}>
				<h1>This is the sidebar</h1>
			</div>
			<div className={style.mainContent}>{children}</div>
		</div>
	);
}
export default HomeLayoutComponent;
