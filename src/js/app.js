// ============================== Graph Modal =================================
!(function (t) {
	var e = {};
	function o(n) {
		if (e[n]) return e[n].exports;
		var i = (e[n] = { i: n, l: !1, exports: {} });
		return t[n].call(i.exports, i, i.exports, o), (i.l = !0), i.exports;
	}
	(o.m = t),
		(o.c = e),
		(o.d = function (t, e, n) {
			o.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
		}),
		(o.r = function (t) {
			"undefined" != typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
				Object.defineProperty(t, "__esModule", { value: !0 });
		}),
		(o.t = function (t, e) {
			if ((1 & e && (t = o(t)), 8 & e)) return t;
			if (4 & e && "object" == typeof t && t && t.__esModule) return t;
			var n = Object.create(null);
			if (
				(o.r(n),
				Object.defineProperty(n, "default", { enumerable: !0, value: t }),
				2 & e && "string" != typeof t)
			)
				for (var i in t)
					o.d(
						n,
						i,
						function (e) {
							return t[e];
						}.bind(null, i)
					);
			return n;
		}),
		(o.n = function (t) {
			var e =
				t && t.__esModule
					? function () {
							return t.default;
					  }
					: function () {
							return t;
					  };
			return o.d(e, "a", e), e;
		}),
		(o.o = function (t, e) {
			return Object.prototype.hasOwnProperty.call(t, e);
		}),
		(o.p = ""),
		o((o.s = 1));
})([
	function (t, e, o) {
		"use strict";
		o.d(e, "a", function () {
			return n;
		});
		class n {
			constructor(t) {
				(this.options = Object.assign(
					{ isOpen: () => {}, isClose: () => {} },
					t
				)),
					(this.modal = document.querySelector(".graph-modal")),
					(this.speed = 300),
					(this.animation = "fade"),
					(this._reOpen = !1),
					(this._nextContainer = !1),
					(this.modalContainer = !1),
					(this.isOpen = !1),
					(this.previousActiveElement = !1),
					(this._focusElements = [
						"a[href]",
						"input",
						"select",
						"textarea",
						"button",
						"iframe",
						"[contenteditable]",
						'[tabindex]:not([tabindex^="-"])',
					]),
					(this._fixBlocks = document.querySelectorAll(".fix-block")),
					this.events();
			}
			events() {
				this.modal &&
					(document.addEventListener(
						"click",
						function (t) {
							const e = t.target.closest("[data-graph-path]");
							if (e) {
								let t = e.dataset.graphPath,
									o = e.dataset.graphAnimation,
									n = e.dataset.graphSpeed;
								return (
									(this.animation = o || "fade"),
									(this.speed = n ? parseInt(n) : 300),
									(this._nextContainer = document.querySelector(
										`[data-graph-target="${t}"]`
									)),
									void this.open()
								);
							}
							t.target.closest(".js-modal-close") && this.close();
						}.bind(this)
					),
					window.addEventListener(
						"keydown",
						function (t) {
							27 == t.keyCode && this.isOpen && this.close(),
								9 == t.which && this.isOpen && this.focusCatch(t);
						}.bind(this)
					),
					document.addEventListener(
						"click",
						function (t) {
							t.target.classList.contains("graph-modal") &&
								t.target.classList.contains("is-open") &&
								this.close();
						}.bind(this)
					));
			}
			open(t) {
				if (
					((this.previousActiveElement = document.activeElement), this.isOpen)
				)
					return (this.reOpen = !0), void this.close();
				(this.modalContainer = this._nextContainer),
					t &&
						(this.modalContainer = document.querySelector(
							`[data-graph-target="${t}"]`
						)),
					this.modalContainer.scrollTo(0, 0),
					this.modal.style.setProperty(
						"--transition-time",
						this.speed / 1e3 + "s"
					),
					this.modal.classList.add("is-open"),
					(document.body.style.scrollBehavior = "auto"),
					(document.documentElement.style.scrollBehavior = "auto"),
					this.disableScroll(),
					this.modalContainer.classList.add("graph-modal-open"),
					this.modalContainer.classList.add(this.animation),
					setTimeout(() => {
						this.options.isOpen(this),
							this.modalContainer.classList.add("animate-open"),
							(this.isOpen = !0),
							this.focusTrap();
					}, this.speed);
			}
			close() {
				this.modalContainer &&
					(this.modalContainer.classList.remove("animate-open"),
					this.modalContainer.classList.remove(this.animation),
					this.modal.classList.remove("is-open"),
					this.modalContainer.classList.remove("graph-modal-open"),
					this.enableScroll(),
					(document.body.style.scrollBehavior = "auto"),
					(document.documentElement.style.scrollBehavior = "auto"),
					this.options.isClose(this),
					(this.isOpen = !1),
					this.focusTrap(),
					this.reOpen && ((this.reOpen = !1), this.open()));
			}
			focusCatch(t) {
				const e = this.modalContainer.querySelectorAll(this._focusElements),
					o = Array.prototype.slice.call(e),
					n = o.indexOf(document.activeElement);
				t.shiftKey && 0 === n && (o[o.length - 1].focus(), t.preventDefault()),
					t.shiftKey ||
						n !== o.length - 1 ||
						(o[0].focus(), t.preventDefault());
			}
			focusTrap() {
				const t = this.modalContainer.querySelectorAll(this._focusElements);
				this.isOpen
					? t.length && t[0].focus()
					: this.previousActiveElement.focus();
			}
			disableScroll() {
				let t = window.scrollY;
				this.lockPadding(),
					document.body.classList.add("disable-scroll"),
					(document.body.dataset.position = t),
					(document.body.style.top = -t + "px");
			}
			enableScroll() {
				let t = parseInt(document.body.dataset.position, 10);
				this.unlockPadding(),
					(document.body.style.top = "auto"),
					document.body.classList.remove("disable-scroll"),
					window.scrollTo({ top: t, left: 0 }),
					document.body.removeAttribute("data-position");
			}
			lockPadding() {
				let t = window.innerWidth - document.body.offsetWidth + "px";
				this._fixBlocks.forEach((e) => {
					e.style.paddingRight = t;
				}),
					(document.body.style.paddingRight = t);
			}
			unlockPadding() {
				this._fixBlocks.forEach((t) => {
					t.style.paddingRight = "0px";
				}),
					(document.body.style.paddingRight = "0px");
			}
		}
	},
	function (t, e, o) {
		"use strict";
		o.r(e),
			function (t) {
				var e = o(0);
				o(3), o(4);
				t.GraphModal = e.a;
			}.call(this, o(2));
	},
	function (t, e) {
		var o;
		o = (function () {
			return this;
		})();
		try {
			o = o || new Function("return this")();
		} catch (t) {
			"object" == typeof window && (o = window);
		}
		t.exports = o;
	},
	function (t, e) {
		"undefined" != typeof Element &&
			(Element.prototype.matches ||
				(Element.prototype.matches =
					Element.prototype.msMatchesSelector ||
					Element.prototype.webkitMatchesSelector),
			Element.prototype.closest ||
				(Element.prototype.closest = function (t) {
					var e = this;
					do {
						if (e.matches(t)) return e;
						e = e.parentElement || e.parentNode;
					} while (null !== e && 1 === e.nodeType);
					return null;
				}));
	},
	function (t, e, o) {},
]);
// ============================== //Graph Modal ===============================

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

// Login modal
(function () {
	const loginModal = new GraphModal();
})();
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
		if (result) {
			result.style.left = `${x}px`;
		}
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
		let x = ((val * n) / 100) * (progress?.offsetWidth - 18) - 4;
		if (result) {
			result.style.left = `${x}px`;
		}

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

		const min = progress?.min;
		const max = progress?.max;
		const val = progress?.value;

		if (progress) {
			progress.style.backgroundSize =
				((val - min) * 100) / (max - min) + "% 100%";
		}

		let n = 100 / max;
		let x = ((val * n) / 100) * (progress?.offsetWidth - 18) - 6;
		if (result) {
			result.style.left = `${x}px`;
		}
	});

	progress?.addEventListener("mousedown", () => {
		result.classList.add("active");
	});
	progress?.addEventListener("mouseup", () => {
		result.classList.remove("active");
	});
	progress?.addEventListener("touchstart", () => {
		result.classList.add("active");
	});
	progress?.addEventListener("touchend", () => {
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
		if (result) {
			result.style.left = `${x}px`;
		}
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
		let x = ((val * n) / 100) * (progress?.offsetWidth - 18) - 4;
		if (result) {
			result.style.left = `${x}px`;
		}

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

		const min = progress?.min;
		const max = progress?.max;
		const val = progress?.value;

		if (progress) {
			progress.style.backgroundSize =
				((val - min) * 100) / (max - min) + "% 100%";
		}

		let n = 100 / max;
		let x = ((val * n) / 100) * (progress?.offsetWidth - 18) - 6;
		if (result) {
			result.style.left = `${x}px`;
		}
	});

	progress?.addEventListener("mousedown", () => {
		result.classList.add("active");
	});
	progress?.addEventListener("mouseup", () => {
		result.classList.remove("active");
	});
	progress?.addEventListener("touchstart", () => {
		result.classList.add("active");
	});
	progress?.addEventListener("touchend", () => {
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
		if (result) {
			result.style.left = `${x}px`;
		}
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
		let x = ((val * n) / 100) * (progress?.offsetWidth - 18) - 4;
		if (result) {
			result.style.left = `${x}px`;
		}

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

		const min = progress?.min;
		const max = progress?.max;
		const val = progress?.value;

		if (progress) {
			progress.style.backgroundSize =
				((val - min) * 100) / (max - min) + "% 100%";
		}

		let n = 100 / max;
		let x = ((val * n) / 100) * (progress?.offsetWidth - 18) - 6;
		if (result) {
			result.style.left = `${x}px`;
		}
	});

	progress?.addEventListener("mousedown", () => {
		result.classList.add("active");
	});
	progress?.addEventListener("mouseup", () => {
		result.classList.remove("active");
	});
	progress?.addEventListener("touchstart", () => {
		result.classList.add("active");
	});
	progress?.addEventListener("touchend", () => {
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

		if (toggle) {
			if (!isDropdownChild) {
				toggle.checked = false;
			}
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
