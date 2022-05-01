import HomeLayoutComponent from "../components/homelayoutcomponent";
import style from "../styles/Home.module.css";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { FaComment } from "react-icons/fa";
function Home() {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [newPost, setNewPost] = useState("");
	const router = useRouter();
	const [more, setMore] = useState(true);

	const handlePostChange = (e) => {
		setNewPost(e.target.value);
	};

	const fetchPostsPostLoad = async (currentpage) => {
		if (!more) return false;
		if (!localStorage.getItem("token")) return router.push("/login");
		const url = `https://creatica2022-be-aotynourea-as.a.run.app/api/v1/post?limit=20&page=${currentpage}&sort=created_at%20desc`;
		const postdata = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}).catch(() => {
			toast.error("Error fetching data");
			router.push("/login");
		});
		const jsondata = await postdata.json();
		if (!jsondata || jsondata.status !== 200) {
			toast("Error fetching posts", { type: "error" });
			return;
		}
		setMore(jsondata.page_info.more);
		if (jsondata.posts === null) {
			setMore(false);
			return;
		}

		//Filter jsondata.posts to remove posts that are duplicates
		const filteredPosts = jsondata.posts.filter((post) => {
			return !data.some((dataPost) => {
				return dataPost.id === post.id;
			});
		});
		setData([...data, ...filteredPosts]);
	};
	const handlePostSubmit = async () => {
		if (newPost === "") {
			toast("Please enter a post", { type: "error" });
			return;
		}

		const data = await fetch(
			"https://creatica2022-be-aotynourea-as.a.run.app/api/v1/post",
			{
				method: "POST",
				body: JSON.stringify({
					body: newPost,
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		).catch();
		const jsondata = await data.json();
		if (!jsondata || jsondata.status !== 201) {
			return toast("Post failed. Are you sure you are logged in?", {
				type: "error",
			});
		}
		toast("Post successful.", { type: "success" });
		// Refresh
		router.reload();
	};
	const endOfPostRef = useRef();
	const endOfPostCallback = useCallback(
		(node) => {
			if (loading) return;
			if (endOfPostRef.current) endOfPostRef.current.disconnect();
			endOfPostRef.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && more) {
					setPage((prev) => prev + 1);
				}
			});
			if (node) endOfPostRef.current.observe(node);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[loading, more]
	);

	const handlePostDetail = (id) => {
		router.push(`/post/${id}`);
	};

	useEffect(() => {
		fetchPostsPostLoad(page);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	return (
		<HomeLayoutComponent>
			<>
				{!loading ? (
					<>
						<div className={style.newPostBox}>
							<h1 className={style.pageDesc}>Home</h1>
							<textarea
								name="newPost"
								className={"form-control " + style.inputBox}
								placeholder="Write Something..."
								onChange={handlePostChange}
							></textarea>
							<button className={style.postButton} onClick={handlePostSubmit}>
								Post
							</button>
						</div>
						<div className={style.postList}>
							{data.map((post, index) => {
								if (index === data.length - 5) {
								} else {
									return (
										<div
											className={style.post}
											key={post.id}
											onClick={(e) => {
												e.preventDefault();
												handlePostDetail(post.id);
											}}
										>
											<h6>
												{post.username}{" "}
												{post.created_at !== post.updated_at && (
													<span>&#40;Edited&#41;</span>
												)}
											</h6>
											<p>
												{post.body.length >= 450
													? post.body.split("").slice(0, 450).join("") + "..."
													: post.body}
											</p>
											<div className={style.postFoot}>
												<span>
													Posted:{" "}
													{new Date(post.created_at * 1000).toLocaleString(
														"id-ID"
													)}
												</span>
												<div className={style.comments}>
													{<FaComment size={15} />}
													{post.comment_count}
												</div>
											</div>
										</div>
									);
								}
							})}
						</div>
					</>
				) : (
					<h1>Loading...</h1>
				)}
			</>
		</HomeLayoutComponent>
	);
}
Home.pageInformation = {
	title: "Home",
	description: "Homepage",
	url: "https://betterhelp.org/login",
};
Home.pageBehaviour = {
	noheader: true,
	nofooter: true,
};
export default Home;
