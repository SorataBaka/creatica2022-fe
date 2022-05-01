import HomeLayoutComponent from "../../components/homelayoutcomponent";
import style from "../../styles/Detail.module.css";
import { useEffect, useState, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { FaChevronLeft } from "react-icons/fa";
function PostDetail() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(undefined);
	const fetchPostDetail = async (postid) => {
		const data = await fetch(
			`https://creatica2022-be-aotynourea-as.a.run.app/api/v1/post/${postid}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		).catch(() => {
			if (!jsondata || jsondata.status !== 200) {
				toast("Post not found", { type: "error" });
				return;
			}
		});
		const jsondata = await data.json();
		if (!jsondata || jsondata.status !== 200) {
			toast("Post not found", { type: "error" });
		}
		setData(jsondata);
	};
	useEffect(() => {
		if (!router.isReady) return;
		setLoading(true);
		fetchPostDetail(router.query.id);
		setLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.isReady]);

	return (
		<HomeLayoutComponent>
			<div className={style.contentBox}>
				<div className={style.topBar}>
					<div
						className={style.backButton}
						onClick={() => {
							router.push("/");
						}}
					>
						<FaChevronLeft size={30} />
					</div>
					<h1 className={style.pageDesc}>Post</h1>
				</div>
				{!loading && !data && <h1>No Post</h1>}
				{!loading && data && (
					<>
						<div className={style.postDetailBox}>
							<h6>{data.post?.username}</h6>
							<p>{data.post?.body}</p>
							<span>
								{new Date(data.post?.created_at * 1000).toDateString()}{" "}
							</span>
						</div>
						<div className={style.commentBox}>
							<h1>This is the comments</h1>
						</div>
					</>
				)}
			</div>
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
