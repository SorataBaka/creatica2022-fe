import HomeLayoutComponent from "../../components/homelayoutcomponent";
import style from "../../styles/Detail.module.css";
import { useEffect, useState, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
function PostDetail() {
	return (
		<HomeLayoutComponent>
			<h1>Post Detail</h1>
		</HomeLayoutComponent>
	);
}

PostDetail.pageInformation = {
	title: "Posts",
	description: "Post Detail",
	url: "https://betterhelp.org/post/[id]",
};
PostDetail.pageBehaviour = {
	noheader: true,
	nofooter: true,
};
export default PostDetail;
