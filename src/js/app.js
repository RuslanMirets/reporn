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

// Tooltip
const tooltip = (btn, content) => {
	btn?.addEventListener("click", (e) => {
		btn?.classList.toggle("active");
		content?.classList.toggle("active");
		e.stopPropagation();
	});

	document.addEventListener("click", (e) => {
		btn?.classList.remove("active");
		content?.classList.remove("active");
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
		dropArea?.addEventListener(e, prevents);
	});
	["dragenter", "dragover"].forEach((e) => {
		dropArea?.addEventListener(e, active);
	});
	["dragleave", "drop"].forEach((e) => {
		dropArea?.addEventListener(e, inactive);
	});

	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = function () {
			const img = document.querySelector(".form-create__preview");
			img.src = reader.result;
		};
	};

	const handleDrop = (e) => {
		const dt = e.dataTransfer;
		const file = dt.files[0];
		dropArea.classList.add("active");
		previewFile(file);
		document
			.querySelector(".form-create__range--access")
			.classList.remove("disable");
	};

	const handleChange = (e) => {
		const file = e.target.files[0];
		dropArea.classList.add("active");
		previewFile(file);

		if (file) {
			document
				.querySelector(".form-create__range--access")
				.classList.remove("disable");
		}
	};

	dropArea?.addEventListener("change", handleChange);
	dropArea?.addEventListener("drop", handleDrop);

	deleteImg?.addEventListener("click", () => {
		fileElem.value = "";
		dropArea.classList.remove("active");
		document
			.querySelector(".form-create__range--access")
			.classList.add("disable");
	});
})();

// Toggle Advanced mode
(function () {
	const toggle = document.querySelector("#advancedMode");
	const advancedContent = document.querySelector(".form-create__advanced");

	toggle?.addEventListener("change", () => {
		if (toggle.checked == true) {
			// advancedContent.style.maxHeight = advancedContent.scrollHeight + "px";
			// advancedContent.style.overflow = "visible";
			advancedContent.classList.add("active");
		} else {
			// advancedContent.style.maxHeight = null;
			// advancedContent.style.overflow = "hidden";
			advancedContent.classList.remove("active");
		}
	});
})();

// Guidance Scale Tooltip
(function () {
	const btn = document.querySelector("#scaleTooltipBtn");
	const content = document.querySelector("#scaleTooltipContent");

	tooltip(btn, content);
})();

// Steps Tooltip
(function () {
	const btn = document.querySelector("#stepsTooltipBtn");
	const content = document.querySelector("#stepsTooltipContent");

	tooltip(btn, content);
})();

// Ratio Tooltip
(function () {
	const btn = document.querySelector("#ratioTooltipBtn");
	const content = document.querySelector("#ratioTooltipContent");

	tooltip(btn, content);
})();

// Strength Tooltip
(function () {
	const btn = document.querySelector("#strengthTooltipBtn");
	const content = document.querySelector("#strengthTooltipContent");

	tooltip(btn, content);
})();

// Guidance Scale
(function () {
	const progress = document.querySelector("#guidanceScale");
	const result = document.querySelector("#resultGuidanceScale");

	const min = progress?.min;
	const max = progress?.max;
	const val = progress?.value;

	if (result) {
		result.textContent = progress?.value;
	}

	if (progress) {
		progress.style.backgroundSize =
			((val - min) * 100) / (max - min) + "% 100%";
	}

	let n = 100 / max;
	let x = ((val * n) / 100) * (progress?.offsetWidth - 18) - 6;
	if (result) {
		result.style.left = `${x}px`;
	}

	progress?.addEventListener("input", (e) => {
		result.textContent = e.target.value;
		const min = e.target.min;
		const max = e.target.max;
		const val = e.target.value;

		const leftLine = document.querySelector("#leftLineGuidanceScale");
		const rightLine = document.querySelector("#rightLineGuidanceScale");

		e.target.style.backgroundSize =
			((val - min) * 100) / (max - min) + "% 100%";

		let n = 100 / max;
		let x = ((val * n) / 100) * (progress.offsetWidth - 18) - 4;
		result.style.left = `${x}px`;

		if (e.target.value > min) {
			leftLine.style.backgroundColor = "var(--main-red-color)";
		} else {
			leftLine.style.backgroundColor = "var(--secondary-3-color)";
		}

		if (e.target.value == max) {
			rightLine.style.backgroundColor = "var(--main-red-color)";
		} else {
			rightLine.style.backgroundColor = "var(--secondary-3-color)";
		}
	});

	window.addEventListener("resize", (e) => {
		const progress = document.querySelector("#guidanceScale");
		const result = document.querySelector("#resultGuidanceScale");

		const min = progress.min;
		const max = progress.max;
		const val = progress.value;

		progress.style.backgroundSize =
			((val - min) * 100) / (max - min) + "% 100%";

		let n = 100 / max;
		let x = ((val * n) / 100) * (progress.offsetWidth - 18) - 6;
		result.style.left = `${x}px`;
	});

	progress.addEventListener("mousedown", () => {
		result.classList.add("active");
	});
	progress.addEventListener("mouseup", () => {
		result.classList.remove("active");
	});
	progress.addEventListener("touchstart", () => {
		result.classList.add("active");
	});
	progress.addEventListener("touchend", () => {
		result.classList.remove("active");
	});
})();

// Steps
(function () {
	const progress = document.querySelector("#steps");
	const result = document.querySelector("#resultSteps");

	const min = progress?.min;
	const max = progress?.max;
	const val = progress?.value;

	if (result) {
		result.textContent = progress?.value;
	}

	if (progress) {
		progress.style.backgroundSize =
			((val - min) * 100) / (max - min) + "% 100%";
	}

	let n = 100 / max;
	let x = ((val * n) / 100) * (progress?.offsetWidth - 18) - 6;
	if (result) {
		result.style.left = `${x}px`;
	}

	progress?.addEventListener("input", (e) => {
		result.textContent = e.target.value;
		const min = e.target.min;
		const max = e.target.max;
		const val = e.target.value;

		const leftLine = document.querySelector("#leftLineSteps");
		const rightLine = document.querySelector("#rightLineSteps");

		e.target.style.backgroundSize =
			((val - min) * 100) / (max - min) + "% 100%";

		let n = 100 / max;
		let x = ((val * n) / 100) * (progress.offsetWidth - 18) - 4;
		result.style.left = `${x}px`;

		if (e.target.value > min) {
			leftLine.style.backgroundColor = "var(--main-red-color)";
		} else {
			leftLine.style.backgroundColor = "var(--secondary-3-color)";
		}

		if (e.target.value == max) {
			rightLine.style.backgroundColor = "var(--main-red-color)";
		} else {
			rightLine.style.backgroundColor = "var(--secondary-3-color)";
		}
	});

	window.addEventListener("resize", (e) => {
		const progress = document.querySelector("#steps");
		const result = document.querySelector("#resultSteps");

		const min = progress.min;
		const max = progress.max;
		const val = progress.value;

		progress.style.backgroundSize =
			((val - min) * 100) / (max - min) + "% 100%";

		let n = 100 / max;
		let x = ((val * n) / 100) * (progress.offsetWidth - 18) - 6;
		result.style.left = `${x}px`;
	});

	progress.addEventListener("mousedown", () => {
		result.classList.add("active");
	});
	progress.addEventListener("mouseup", () => {
		result.classList.remove("active");
	});
	progress.addEventListener("touchstart", () => {
		result.classList.add("active");
	});
	progress.addEventListener("touchend", () => {
		result.classList.remove("active");
	});
})();

// Strength
(function () {
	const progress = document.querySelector("#strength");
	const result = document.querySelector("#resultStrength");

	const min = progress?.min;
	const max = progress?.max;
	const val = progress?.value;

	if (result) {
		result.textContent = progress?.value;
	}

	if (progress) {
		progress.style.backgroundSize =
			((val - min) * 100) / (max - min) + "% 100%";
	}

	let n = 100 / max;
	let x = ((val * n) / 100) * (progress?.offsetWidth - 18) - 6;
	if (result) {
		result.style.left = `${x}px`;
	}

	progress?.addEventListener("input", (e) => {
		result.textContent = e.target.value;
		const min = e.target.min;
		const max = e.target.max;
		const val = e.target.value;

		const leftLine = document.querySelector("#leftLineStrength");
		const rightLine = document.querySelector("#rightLineStrength");

		e.target.style.backgroundSize =
			((val - min) * 100) / (max - min) + "% 100%";

		let n = 100 / max;
		let x = ((val * n) / 100) * (progress.offsetWidth - 18) - 4;
		result.style.left = `${x}px`;

		if (e.target.value > min) {
			leftLine.style.backgroundColor = "var(--main-red-color)";
		} else {
			leftLine.style.backgroundColor = "var(--secondary-3-color)";
		}

		if (e.target.value == max) {
			rightLine.style.backgroundColor = "var(--main-red-color)";
		} else {
			rightLine.style.backgroundColor = "var(--secondary-3-color)";
		}
	});

	window.addEventListener("resize", (e) => {
		const progress = document.querySelector("#strength");
		const result = document.querySelector("#resultStrength");

		const min = progress.min;
		const max = progress.max;
		const val = progress.value;

		progress.style.backgroundSize =
			((val - min) * 100) / (max - min) + "% 100%";

		let n = 100 / max;
		let x = ((val * n) / 100) * (progress.offsetWidth - 18) - 6;
		result.style.left = `${x}px`;
	});

	progress.addEventListener("mousedown", () => {
		result.classList.add("active");
	});
	progress.addEventListener("mouseup", () => {
		result.classList.remove("active");
	});
	progress.addEventListener("touchstart", () => {
		result.classList.add("active");
	});
	progress.addEventListener("touchend", () => {
		result.classList.remove("active");
	});
})();

// Sampler dropdown
(function () {
	const label = document.querySelector(".dropdown__filter-selected");
	const options = Array.from(
		document.querySelectorAll(".dropdown__select-option")
	);
	const toggle = document.querySelector(".dropdown__switch");

	options.forEach((option) => {
		option.addEventListener("click", () => {
			label.textContent = option.textContent;
			toggle.value = option.value;
		});
	});

	document.addEventListener("click", (e) => {
		const element = e.target;

		if (element == toggle) return;

		const isDropdownChild = element.closest(".dropdown__filter");

		if (!isDropdownChild) {
			toggle.checked = false;
		}
	});
})();

// Model swiper
(function () {
	const modelSwiper = new Swiper(".model__swiper", {
		slidesPerView: "auto",
		spaceBetween: 16,
		navigation: {
			prevEl: ".model__arrow--left",
			nextEl: ".model__arrow--right",
		},
		breakpoints: {
			1400: {
				noSwiping: true,
				noSwipingClass: "swiper-slide",
			},
		},
	});
})();
// ========================== // CREATE ARTWORK PAGE ==========================
