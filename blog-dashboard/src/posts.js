import React, { useEffect, useState } from "react";
import "./posts.css";

import { initializeApp } from "firebase/app";
import { getFirestore, query, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBHRBOGGiyAEdJQ5gOf_Ml5m2o_YV7eKkY",
	authDomain: "blog-d05ca.firebaseapp.com",
	projectId: "blog-d05ca",
	storageBucket: "blog-d05ca.appspot.com",
	messagingSenderId: "680020835840",
	appId: "1:680020835840:web:509a74fd20c2c228a4a2e5",
	measurementId: "G-W3570PELH0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Posts() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const connect = async () => {
			const posts_data = await getDocs(query(collection(db, "posts")));
			setPosts(
				posts_data.docs.map((post) => ({
					...post.data(),
					id: post.id,
				}))
			);
		};

		connect();
	}, []);

	function timeConverter(UNIX_timestamp) {
		var a = new Date(UNIX_timestamp.seconds * 1000);
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var time = month + " " + date + ", " + year;
		return time;
	}

	return (
		<div id="posts">
			{posts.map((post) => {
				return (
					<div className="post" key={post.id}>
						<a href="#">{post.title}</a>
						<p>{post.subtitle}</p>
						<div className="container">
							<div id="date">{timeConverter(post.date)}</div>
							<div id="tags">
								{post.tags.map((tag) => {
									return " " + tag;
								})}
							</div>
						</div>
						<div id="status">
							Published: <input type="checkbox" checked={post.public}></input>{" "}
						</div>
					</div>
				);
			})}
		</div>
	);
}
