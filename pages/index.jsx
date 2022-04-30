import HomeLayoutComponent from "../components/homelayoutcomponent";
import style from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function Home() {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [newPost, setNewPost] = useState("");
	const [more, setMore] = useState(true);
	const router = useRouter();

	const handlePostChange = (e) => {
		setNewPost(e.target.value);
	};

	const handlePostSubmit = async () => {
		if (!more) return toast("No more posts to load", { type: "error" });
		setLoading(true);
		if (!newPost) return toast("Please enter a post", { type: "error" });
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
		setNewPost("");
		setPage(1);
		setData([]);
		setMore(jsondata.page_info.more);
		// Refresh
		router.reload();
	};

	const fetchPostsPostLoad = async () => {
		setLoading(true);
		if (!localStorage.getItem("token")) router.push("/login");
		const url = `https://creatica2022-be-aotynourea-as.a.run.app/api/v1/post?limit=20&page=${page}&sort=created_at%20desc`;
		setPage(page + 1);
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
		console.log(JSON.stringify(jsondata));
		if (!jsondata || jsondata.status !== 200) {
			toast("Error fetching posts", { type: "error" });
			return;
		}
		const newdata = data;
		for (const post of jsondata.posts) {
			if (data.indexOf(post) !== -1) continue;
			newdata.push(post);
		}
		setData(newdata);
		setLoading(false);
	};

	const handlePostDetail = (id) => {
		router.push(`/post/${id}`);
	};

	useEffect(() => {
		fetchPostsPostLoad();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<HomeLayoutComponent>
			{loading ? (
				<h1 className={style.loading}>Loading...</h1>
			) : (
				<>
					<div className={style.newPostBox}>
						<textarea
							name="newPost"
							className={"form-control " + style.inputBox}
							placeholder="New Post"
							onChange={handlePostChange}
						></textarea>
						<button
							className={style.postButton + " btn btn-primary"}
							onClick={handlePostSubmit}
						>
							Post
						</button>
					</div>
					<div className={style.postList}>
						{data.map((post) => {
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
										{post.created_at !== post.updated_at ? (
											<span>&#40;Edited&#41;</span>
										) : (
											""
										)}
									</h6>
									<p>{post.body}</p>
									<span>{new Date(post.created_at * 1000).toDateString()}</span>
								</div>
							);
						})}
					</div>
				</>
			)}
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
