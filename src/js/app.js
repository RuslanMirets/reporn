// ================================ GLOBAL =================================
// Mobile check
(function () {
	const userAgent = navigator.userAgent || navigator.vendor || window.opera;
	if (/android/i.test(userAgent)) {
		document.querySelector("html").classList.add("page--android");
		return "Android";
	}
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		document.querySelector("html").classList.add("page--ios");
		return "iOS";
	}
	return "unknown";
})();

// Webp check
const webpCheck = (callback) => {
	var webP = new Image();
	webP.onload = webP.onerror = () => {
		callback(webP.height == 2);
	};
	webP.src =
		"data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
};
webpCheck((support) => {
	if (support == true) {
		document.querySelector("html").classList.add("webp");
	} else {
		document.querySelector("html").classList.add("no-webp");
	}
});

// Burger menu
const burger = document.querySelector(".burger");
const burgerOpen = document.querySelector(".burger__img--open");
const burgerClose = document.querySelector(".burger__img--close");
const menu = document.querySelector(".mobile-menu");
const body = document.querySelector("body");

burger.addEventListener("click", (e) => {
	burgerOpen.classList.toggle("active");
	burgerClose.classList.toggle("active");
	menu.classList.toggle("active");
	body.classList.toggle("dis-scroll");
});
(function () {})();

// User dropdown
(function () {
	const btn = document.querySelector(".header__user-btn");
	const dropdown = document.querySelector(".dropdown-user");

	btn?.addEventListener("click", (e) => {
		btn.classList.toggle("active");
		dropdown.classList.toggle("active");
		e.stopPropagation();
	});

	document.addEventListener("click", (e) => {
		btn?.classList.remove("active");
		dropdown?.classList.remove("active");
	});
})();
// ================================ //GLOBAL =================================

// ================================ MAIN PAGE ==============================
// Search textarea
(function () {
	const textarea = document.querySelector(".search__textarea");
	const reset = document.querySelector(".search__reset");

	function autosize() {
		setTimeout(function () {
			textarea.style.cssText = "height:auto;";
			textarea.style.cssText = "height:" + textarea.scrollHeight + "px";
		}, 0);
	}

	textarea.addEventListener("keydown", autosize);
	reset.addEventListener("click", (e) => {
		autosize();
	});
	window.addEventListener("resize", (e) => {
		autosize();
	});
})();

// Sort dropdown
(function () {
	const btn = document.querySelector(".sort__btn");
	const dropdown = document.querySelector(".sort__content");

	btn?.addEventListener("click", (e) => {
		btn.classList.toggle("active");
		if (dropdown.style.maxHeight) {
			dropdown.style.maxHeight = null;
		} else {
			dropdown.style.maxHeight = dropdown.scrollHeight + "px";
		}
		e.stopPropagation();
	});

	document.addEventListener("click", (e) => {
		btn?.classList.remove("active");
		dropdown.style.maxHeight = null;
	});
})();
// ================================ // MAIN PAGE ==============================
