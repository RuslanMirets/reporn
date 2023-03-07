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

// Auto height textarea
const authHeightTextarea = (textarea, reset) => {
	const autosize = () => {
		setTimeout(function () {
			textarea.style.cssText = "height:auto;";
			textarea.style.cssText = "height:" + textarea.scrollHeight + "px";
		}, 0);
	};
	textarea.addEventListener("keydown", autosize);
	reset.addEventListener("click", (e) => {
		textarea.value = "";
		autosize();
	});
	window.addEventListener("resize", (e) => {
		autosize();
	});
};
// ================================ //GLOBAL =================================

// ================================ MAIN PAGE ==============================
// Search textarea
(function () {
	const textarea = document.querySelector("#textareaSearch");
	const reset = document.querySelector("#resetSearch");
	textarea && authHeightTextarea(textarea, reset);
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
		if (dropdown) {
			dropdown.style.maxHeight = null;
		}
	});
})();
// ================================ // MAIN PAGE ==============================

// ========================== CREATE ARTWORK PAGE =============================
// Prompt textarea
(function () {
	const textarea = document.querySelector("#textareaPrompt");
	const reset = document.querySelector("#resetPrompt");
	textarea && authHeightTextarea(textarea, reset);
})();

// Prompt Negative textarea
(function () {
	const textarea = document.querySelector("#textareaNegativePrompt");
	const reset = document.querySelector("#resetNegativePrompt");
	textarea && authHeightTextarea(textarea, reset);
})();

// Drop image
(function () {
	const dropArea = document.querySelector("#dropArea");
	const fileElem = document.querySelector("#fileElem");
	const deleteImg = document.querySelector("#deleteImg");

	const active = () => dropArea.classList.add("highlight");
	const inactive = () => dropArea.classList.remove("highlight");
	const prevents = (e) => e.preventDefault();

	["dragenter", "dragover", "dragleave", "drop"].forEach((e) => {
		dropArea.addEventListener(e, prevents);
	});
	["dragenter", "dragover"].forEach((e) => {
		dropArea.addEventListener(e, active);
	});
	["dragleave", "drop"].forEach((e) => {
		dropArea.addEventListener(e, inactive);
	});

	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = function () {
			const img = document.querySelector(".form-create__preview");
			img.src = reader.result;
		};
		console.log(reader);
	};

	const handleDrop = (e) => {
		const dt = e.dataTransfer;
		const file = dt.files[0];
		dropArea.classList.add("active");
		previewFile(file);
	};

	const handleChange = (e) => {
		const file = e.target.files[0];
		dropArea.classList.add("active");
		previewFile(file);
	};

	dropArea.addEventListener("change", handleChange);
	dropArea.addEventListener("drop", handleDrop);

	deleteImg.addEventListener("click", () => {
		fileElem.value = "";
		dropArea.classList.remove("active");
	});
})();
// ========================== // CREATE ARTWORK PAGE ==========================
