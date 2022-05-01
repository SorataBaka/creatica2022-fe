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
	const [newComment, setNewComment] = useState("");
	const fetchPostDetail = async (postid) => {
		const data = await fetch(
			`https://creatica2022-be-aotynourea-as.a.run.app/api/v1/post/${postid}?sort=created_at%20desc`,
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

	const handleCommentPost = async () => {
		if (newComment === "") {
			toast("Please enter a comment", { type: "error" });
			return;
		}
		const data = await fetch(
			"https://creatica2022-be-aotynourea-as.a.run.app/api/v1/comment",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({
					post_id: router.query.id,
					body: newComment,
				}),
			}
		).catch();
		const jsondata = await data.json();
		if (!jsondata || jsondata.status !== 200) {
			toast("Comment not posted", { type: "error" });
			return;
		}
		toast("Comment posted", { type: "success" });
		router.reload();
	};
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
				{loading && <h1 className={style.warning}>Loading..</h1>}
				{!loading && data ? (
					<>
						<div className={style.postDetailBox}>
							<h6>{data.post?.username}</h6>
							<p>{data.post?.body}</p>
							<span>
								{new Date(data.post?.created_at * 1000).toDateString()}{" "}
							</span>
						</div>
						<div className={style.commentBox}>
							<h5>Comments</h5>
							<div className={style.commentInputBox}>
								<textarea
									name=""
									placeholder="Type something..."
									className={"form-control"}
									value={newComment}
									onChange={(e) => {
										setNewComment(e.target.value);
									}}
								></textarea>
								<div className={style.commentBoxFooter}>
									<button
										className={"btn btn-primary " + style.commentButton}
										onClick={handleCommentPost}
									>
										Comment
									</button>
								</div>
							</div>
							<div className={style.commentList}>
								{data.comment === null ? (
									<div className={style.noCommentDiv}>
										<h6>No comments yet</h6>
									</div>
								) : (
									<>
										{data.comment?.map((comment) => (
											<div
												className={style.commentInputBox + " " + style.comment}
												key={comment.id}
											>
												<h6>{comment.username}</h6>
												<p>{comment.body}</p>
												<span>
													{new Date(comment.created_at * 1000).toDateString()}{" "}
												</span>
											</div>
										))}
									</>
								)}
							</div>
						</div>
					</>
				) : (
					<h1 className={style.warning}>Post not found.</h1>
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
