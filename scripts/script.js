var x = document.getElementById("nav_buttons");

function toggleNav() {
	if (x.classList.contains("nav_active")) {
		x.classList.remove("nav_active");
		document.body.style.overflowY = "scroll";
		document.getElementsByTagName("html")[0].style.overflowY = "scroll";
		setTimeout(function () {
			x.style.zIndex = "-1";
		}, 500);
	} else {
		x.classList.add("nav_active");
		x.style.zIndex = "1";
		document.body.style.overflowY = "hidden";
		document.getElementsByTagName("html")[0].style.overflowY = "hidden";
	}
}
