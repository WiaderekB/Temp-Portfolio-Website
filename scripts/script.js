var x = document.getElementById("nav_buttons");

function toggleNav() {
	if (x.classList.contains("nav_active")) {
		x.classList.remove("nav_active");
		setTimeout(function () {
			x.style.zIndex = "-1";
		}, 500);
	} else {
		x.classList.add("nav_active");
		x.style.zIndex = "1";
	}
}
