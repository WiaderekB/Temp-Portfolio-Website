import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { collection, getDocs, getFirestore, query, where } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const firebaseConfig = {
	apiKey: "AIzaSyBHRBOGGiyAEdJQ5gOf_Ml5m2o_YV7eKkY",
	authDomain: "blog-d05ca.firebaseapp.com",
	projectId: "blog-d05ca",
	storageBucket: "blog-d05ca.appspot.com",
	messagingSenderId: "680020835840",
	appId: "1:680020835840:web:509a74fd20c2c228a4a2e5",
	measurementId: "G-W3570PELH0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get data from POST method
let params = new URLSearchParams(location.search);
const tag = params.get("tag");

// Function that creates posts and put them into container
function create_posts(posts) {
	posts.forEach((post) => {
		var container = document.querySelector("main");

		let post_data = post.data();
		function timeConverter(UNIX_timestamp) {
			var a = new Date(UNIX_timestamp.seconds * 1000);
			var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			var year = a.getFullYear();
			var month = months[a.getMonth()];
			var date = a.getDate();
			var time = month + " " + date + ", " + year;
			return time;
		}

		var post = document.createElement("div");
		post.setAttribute("class", "post");
		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttributeNS(null, "viewBox", "0 0 500 27");
		svg.setAttributeNS(null, "fill", "none");

		var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		line.setAttribute("y1", 26);
		line.setAttribute("x1", 500);
		line.setAttribute("y2", 26);
		line.setAttribute("stroke", "#333333");
		line.setAttribute("stroke-width", 3);
		var circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		circle1.setAttribute("cx", 26);
		circle1.setAttribute("cy", 8);
		circle1.setAttribute("r", 8);
		circle1.setAttribute("fill", "#333333");
		var circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		circle2.setAttribute("cx", 50);
		circle2.setAttribute("cy", 8);
		circle2.setAttribute("r", 8);
		circle2.setAttribute("fill", "#333333");
		var circle3 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		circle3.setAttribute("cx", 74);
		circle3.setAttribute("cy", 8);
		circle3.setAttribute("r", 8);
		circle3.setAttribute("fill", "#333333");
		var h1 = document.createElement("a");
		h1.setAttribute("href", "post.html?title=" + post_data.title.replace(" ", "-"));
		var p = document.createElement("p");
		var container_tags = document.createElement("div");
		container_tags.setAttribute("class", "container");
		var tags = document.createElement("div");
		tags.setAttribute("class", "tags");
		var date = document.createElement("div");
		date.setAttribute("class", "date");

		h1.append(post_data.title);
		p.append(post_data.subtitle);

		var tag = document.createElement("a");
		tag.setAttribute("class", "tag");
		tag.setAttribute("href", "writing.html?tag=" + post_data.tags[0]);
		tag.append(post_data.tags[0]);
		tags.append(tag);

		for (let i = 1; i < post_data.tags.length; i++) {
			tags.append(" | ");
			var tag = document.createElement("a");
			tag.setAttribute("class", "tag");
			tag.setAttribute("href", "writing.html?tag=" + post_data.tags[i]);
			tag.append(post_data.tags[i]);
			tags.append(tag);
		}

		date.append(timeConverter(post_data.date));
		container_tags.append(tags);
		container_tags.append(date);

		svg.appendChild(line);
		svg.appendChild(circle1);
		svg.appendChild(circle2);
		svg.appendChild(circle3);
		post.appendChild(svg);
		post.appendChild(h1);
		post.appendChild(p);
		post.appendChild(container_tags);
		container.appendChild(post);
	});
}

// Get posts
async function get_all() {
	const posts = await getDocs(query(collection(db, "posts")));
	document.getElementById("loading").innerHTML = " ";

	create_posts(posts);
}

async function get_tag(tag) {
	const posts = await getDocs(query(collection(db, "posts"), where("tags", "array-contains", tag)));
	document.getElementById("loading").innerHTML = " ";

	create_posts(posts);
}

if (tag == null) {
	get_all();
} else {
	get_tag(tag);
	document.querySelector("#info > h1").innerHTML = "Showing posts with tag: <b>" + tag + "</b>";
}
