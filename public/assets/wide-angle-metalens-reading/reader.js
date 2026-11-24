function mountLabs(article, signal) {
	const NS = "http://www.w3.org/2000/svg";
	const pi = Math.PI;
	const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
	const fmt = (x, digits = 2) => {
		const nearZero = Math.abs(x) < Math.pow(10, -digits) / 2 ? 0 : x;
		return nearZero.toFixed(digits).replace("-", "−");
	};
	const signed = (x, digits = 3) =>
		(x > Math.pow(10, -digits) / 2 ? "+" : "") + fmt(x, digits);
	const plotColors = {
		ink: "var(--tw-prose-body)",
		accent: "var(--btn-content)",
		comparison: "var(--admonitions-color-warning)",
		border: "var(--line-color)",
		muted: "var(--tw-prose-captions)",
		surface: "var(--card-bg)",
		panel: "var(--btn-plain-bg-active)",
	};
	const node = (tag, attrs = {}, text) => {
		const n = document.createElementNS(NS, tag);
		Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, String(v)));
		if (text !== undefined) n.textContent = text;
		return n;
	};
	const add = (parent, tag, attrs = {}, text) => {
		const n = node(tag, attrs, text);
		parent.appendChild(n);
		return n;
	};
	const widthOf = (element) =>
		Math.max(
			240,
			element.getBoundingClientRect().width || element.clientWidth || 600,
		);
	const watch = (root, callback) => {
		let frame = 0;
		let width = root.clientWidth;
		const resized = () => {
			if (root.clientWidth === width) return;
			width = root.clientWidth;
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(callback);
		};
		const observer =
			typeof ResizeObserver === "function" ? new ResizeObserver(resized) : null;
		if (observer) observer.observe(root);
		else window.addEventListener("resize", resized, { passive: true, signal });
		signal.addEventListener(
			"abort",
			() => {
				observer?.disconnect();
				cancelAnimationFrame(frame);
			},
			{ once: true },
		);
	};
	function setupSVG(svg, width, height) {
		svg.replaceChildren();
		svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
		svg.style.height = `${height}px`;
		return svg;
	}
	function axes(svg, box, xRange, yRange, xTicks, yTicks, labels, colors) {
		const [xmin, xmax] = xRange,
			[ymin, ymax] = yRange;
		const sx = (x) => box.l + ((x - xmin) / (xmax - xmin)) * box.w;
		const sy = (y) => box.t + ((ymax - y) / (ymax - ymin)) * box.h;
		const grid = add(svg, "g");
		xTicks.forEach((x) => {
			add(grid, "line", {
				x1: sx(x),
				x2: sx(x),
				y1: box.t,
				y2: box.t + box.h,
				stroke: colors.border,
				"stroke-width": 1,
			});
			add(
				grid,
				"text",
				{ x: sx(x), y: box.t + box.h + 23, "text-anchor": "middle" },
				String(x).replace("-", "−"),
			);
		});
		yTicks.forEach((y) => {
			add(grid, "line", {
				x1: box.l,
				x2: box.l + box.w,
				y1: sy(y),
				y2: sy(y),
				stroke: colors.border,
				"stroke-width": 1,
			});
			add(
				grid,
				"text",
				{ x: box.l - 10, y: sy(y) + 5, "text-anchor": "end" },
				String(y).replace("-", "−"),
			);
		});
		add(svg, "rect", {
			x: box.l,
			y: box.t,
			width: box.w,
			height: box.h,
			fill: "none",
			stroke: colors.border,
			"stroke-width": 1,
		});
		add(
			svg,
			"text",
			{ x: box.l + box.w / 2, y: box.t + box.h + 48, "text-anchor": "middle" },
			labels[0],
		);
		add(
			svg,
			"text",
			{ x: box.l, y: box.t - 13, "text-anchor": "start" },
			labels[1],
		);
		return { sx, sy };
	}
	function clip(svg, id, box) {
		const defs = add(svg, "defs");
		const c = add(defs, "clipPath", { id });
		add(c, "rect", { x: box.l, y: box.t, width: box.w, height: box.h });
		return add(svg, "g", { "clip-path": `url(#${id})` });
	}
	const pathFrom = (points, sx, sy) =>
		points
			.map(
				(p, i) =>
					(i ? "L" : "M") + sx(p[0]).toFixed(2) + "," + sy(p[1]).toFixed(2),
			)
			.join(" ");

	function initPhase() {
		const root = article.querySelector("#lab-phase");
		if (!root) return;
		const canvas = root.querySelector("#phase-canvas");
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const position = root.querySelector("#phase-position"),
			angle = root.querySelector("#phase-angle"),
			mapping = root.querySelector("#phase-mapping");
		const mapCanvas = document.createElement("canvas"),
			mapCtx = mapCanvas.getContext("2d");
		let key = "",
			box = null,
			width = 0,
			height = 0;
		const phase = (q, u, kind) => {
			const s =
				kind === "sin"
					? u
					: kind === "tan"
						? u / Math.sqrt(1 - u * u)
						: Math.asin(u);
			return (
				-2 *
				pi *
				15 *
				(q * u + Math.sqrt((q - s) * (q - s) + 1) - Math.sqrt(s * s + 1))
			);
		};
		const wrap = (x) => ((((x + pi) % (2 * pi)) + 2 * pi) % (2 * pi)) - pi;
		function draw() {
			width = widthOf(canvas);
			height = width < 460 ? 330 : 390;
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.style.height = height + "px";
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			box = { l: 54, t: 25, w: Math.max(100, width - 72), h: height - 84 };
			const nextKey = [
				Math.round(box.w),
				Math.round(box.h),
				mapping.value,
			].join("|");
			if (nextKey !== key) {
				key = nextKey;
				mapCanvas.width = Math.max(1, Math.round(box.w));
				mapCanvas.height = Math.max(1, Math.round(box.h));
				const pixels = mapCtx.createImageData(
					mapCanvas.width,
					mapCanvas.height,
				);
				for (let j = 0; j < mapCanvas.height; j++)
					for (let i = 0; i < mapCanvas.width; i++) {
						const u = -0.99 + (1.98 * (i + 0.5)) / mapCanvas.width,
							q = 1.25 - (2.5 * (j + 0.5)) / mapCanvas.height;
						const value = wrap(phase(q, u, mapping.value)) / pi,
							a = Math.abs(value),
							target = value < 0 ? [47, 80, 218] : [228, 68, 68],
							base = [248, 250, 252];
						const offset = (j * mapCanvas.width + i) * 4;
						for (let c = 0; c < 3; c++)
							pixels.data[offset + c] = Math.round(
								base[c] * (1 - a) + target[c] * a,
							);
						pixels.data[offset + 3] = 255;
					}
				mapCtx.putImageData(pixels, 0, 0);
			}
			const style = getComputedStyle(canvas);
			const u = Number(angle.value),
				q = Number(position.value);
			const selectionInk = "#172e38";
			const sx = (x) => box.l + ((x + 0.99) / 1.98) * box.w,
				sy = (y) => box.t + ((1.25 - y) / 2.5) * box.h;
			ctx.clearRect(0, 0, width, height);
			ctx.drawImage(mapCanvas, box.l, box.t, box.w, box.h);
			ctx.strokeStyle = style.getPropertyValue("--line-color").trim();
			ctx.lineWidth = 1;
			ctx.strokeRect(box.l, box.t, box.w, box.h);
			ctx.font = "14px " + style.fontFamily;
			ctx.fillStyle = style.color;
			ctx.textBaseline = "middle";
			ctx.textAlign = "center";
			[-0.9, -0.5, 0, 0.5, 0.9].forEach((x) => {
				ctx.fillText(String(x).replace("-", "−"), sx(x), box.t + box.h + 23);
			});
			ctx.textAlign = "right";
			[-1, -0.5, 0, 0.5, 1].forEach((y) => {
				ctx.fillText(String(y).replace("-", "−"), box.l - 9, sy(y));
			});
			ctx.textAlign = "left";
			ctx.fillText("透镜位置 x/f", box.l, 11);
			ctx.textAlign = "center";
			ctx.fillText("入射方向 sin θᵢ", box.l + box.w / 2, height - 12);
			ctx.save();
			ctx.beginPath();
			ctx.rect(box.l, box.t, box.w, box.h);
			ctx.clip();
			ctx.setLineDash([]);
			ctx.strokeStyle = "rgba(15,30,40,.65)";
			ctx.lineWidth = 4;
			ctx.beginPath();
			ctx.moveTo(box.l, sy(q));
			ctx.lineTo(box.l + box.w, sy(q));
			ctx.stroke();
			ctx.strokeStyle = "#fff";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(box.l, sy(q));
			ctx.lineTo(box.l + box.w, sy(q));
			ctx.stroke();
			ctx.setLineDash([4, 4]);
			ctx.lineWidth = 1;
			ctx.strokeStyle = selectionInk;
			ctx.beginPath();
			ctx.moveTo(sx(u), box.t);
			ctx.lineTo(sx(u), box.t + box.h);
			ctx.stroke();
			ctx.setLineDash([]);
			ctx.beginPath();
			ctx.arc(sx(u), sy(q), 6, 0, 2 * pi);
			ctx.fillStyle = "#fff";
			ctx.fill();
			ctx.strokeStyle = selectionInk;
			ctx.lineWidth = 2;
			ctx.stroke();
			ctx.restore();
			root.querySelector("#phase-position-label").textContent = fmt(q);
			root.querySelector("#phase-angle-label").textContent = fmt(u);
			root.querySelector("#phase-angle-value").textContent =
				fmt((Math.asin(u) * 180) / pi, 1) + "°";
			root.querySelector("#phase-value").textContent =
				fmt(wrap(phase(q, u, mapping.value)), 3) + " rad";
		}
		[position, angle, mapping].forEach((el) =>
			el.addEventListener("input", draw, { signal }),
		);
		canvas.addEventListener(
			"click",
			(event) => {
				if (!box) return;
				const rect = canvas.getBoundingClientRect(),
					x = event.clientX - rect.left,
					y = event.clientY - rect.top;
				if (x < box.l || x > box.l + box.w || y < box.t || y > box.t + box.h)
					return;
				angle.value = clamp(
					-0.99 + ((x - box.l) / box.w) * 1.98,
					-0.95,
					0.95,
				).toFixed(2);
				position.value = clamp(
					1.25 - ((y - box.t) / box.h) * 2.5,
					-1.2,
					1.2,
				).toFixed(2);
				draw();
			},
			{ signal },
		);
		watch(root, draw);
		const themeRoot = document.documentElement;
		let isDark = themeRoot.classList.contains("dark");
		const theme = new MutationObserver(() => {
			const dark = themeRoot.classList.contains("dark");
			if (dark === isDark) return;
			isDark = dark;
			draw();
		});
		theme.observe(themeRoot, { attributes: true, attributeFilter: ["class"] });
		signal.addEventListener("abort", () => theme.disconnect(), { once: true });
		window.addEventListener("beforeprint", draw, { signal });
		window.addEventListener("afterprint", draw, { signal });
		draw();
	}

	function initAperture() {
		const root = article.querySelector("#lab-aperture");
		if (!root) return;
		const svg = root.querySelector("#aperture-svg"),
			angle = root.querySelector("#aperture-angle"),
			gap = root.querySelector("#aperture-gap"),
			index = root.querySelector("#aperture-index");
		function draw() {
			const width = widthOf(svg),
				height = width < 460 ? 330 : 370,
				colors = plotColors;
			setupSVG(svg, width, height);
			const theta = Number(angle.value),
				d = Number(gap.value),
				n = Number(index.value),
				u = Math.sin((theta * pi) / 180);
			const ideal = -u,
				air = (-d * u) / Math.sqrt(1 - u * u),
				plate = (-d * u) / Math.sqrt(n * n - u * u);
			const ymax = Math.max(
				2.5,
				Math.ceil(Math.max(Math.abs(air), Math.abs(plate)) * 1.12 * 2) / 2,
			);
			const box = { l: 57, t: 33, w: width - 77, h: height - 94 };
			const ticks =
				ymax <= 3
					? [-2, -1, 0, 1, 2]
					: [-ymax, -ymax / 2, 0, ymax / 2, ymax].map((x) =>
							Number(x.toFixed(2)),
						);
			const { sx, sy } = axes(
				svg,
				box,
				[-1, 1],
				[-ymax, ymax],
				[-1, -0.5, 0, 0.5, 1],
				ticks,
				["入射方向 sin θᵢ", "镜面中心 x_c / f"],
				colors,
			);
			const group = clip(svg, "aperture-plot-clip", box),
				samples = Array.from(
					{ length: 321 },
					(_, i) => -0.985 + (1.97 * i) / 320,
				);
			const curves = [
				{ color: colors.muted, fn: (x) => (-d * x) / Math.sqrt(1 - x * x) },
				{
					color: colors.accent,
					fn: (x) => (-d * x) / Math.sqrt(n * n - x * x),
				},
				{ color: colors.ink, fn: (x) => -x, dash: "6 5" },
			];
			curves.forEach((c) =>
				add(group, "path", {
					d: pathFrom(
						samples.map((x) => [x, c.fn(x)]),
						sx,
						sy,
					),
					fill: "none",
					stroke: c.color,
					"stroke-width": c.dash ? 2 : 2.6,
					...(c.dash ? { "stroke-dasharray": c.dash } : {}),
				}),
			);
			add(group, "line", {
				x1: sx(u),
				x2: sx(u),
				y1: box.t,
				y2: box.t + box.h,
				stroke: colors.ink,
				"stroke-opacity": 0.35,
				"stroke-dasharray": "3 4",
			});
			[
				[air, colors.muted],
				[plate, colors.accent],
				[ideal, colors.ink],
			].forEach(([y, color]) =>
				add(group, "circle", {
					cx: sx(u),
					cy: sy(y),
					r: 5.5,
					fill: colors.surface,
					stroke: color,
					"stroke-width": 2.5,
				}),
			);
			root.querySelector("#aperture-angle-label").textContent =
				fmt(theta, 0) + "°";
			root.querySelector("#aperture-gap-label").textContent = fmt(d);
			root.querySelector("#aperture-index-label").textContent = fmt(n);
			root.querySelector("#aperture-ideal").textContent = fmt(ideal, 3);
			const output = (id, value, error) => {
				const el = root.querySelector(id);
				el.replaceChildren(document.createTextNode(fmt(value, 3)));
				const small = document.createElement("small");
				small.textContent = "与理想的差：" + signed(error);
				el.appendChild(small);
			};
			output("#aperture-air", air, air - ideal);
			output("#aperture-plate", plate, plate - ideal);
		}
		[angle, gap, index].forEach((el) =>
			el.addEventListener("input", draw, { signal }),
		);
		watch(root, draw);
		draw();
	}

	function initSampling() {
		const root = article.querySelector("#lab-sampling");
		if (!root) return;
		const svg = root.querySelector("#sampling-svg"),
			input = root.querySelector("#sampling-levels");
		function draw() {
			const width = widthOf(svg),
				height = width < 460 ? 295 : 325,
				colors = plotColors,
				n = Number(input.value);
			setupSVG(svg, width, height);
			const box = { l: 52, t: 33, w: width - 74, h: height - 94 };
			const { sx, sy } = axes(
				svg,
				box,
				[0, 1],
				[0, 1],
				[0, 0.25, 0.5, 0.75, 1],
				[0, 0.25, 0.5, 0.75, 1],
				["周期内位置 x / Λ", "相位 φ / 2π"],
				colors,
			);
			const group = clip(svg, "sampling-plot-clip", box);
			add(group, "path", {
				d: pathFrom(
					[
						[0, 0],
						[1, 1],
					],
					sx,
					sy,
				),
				fill: "none",
				stroke: colors.ink,
				"stroke-width": 2,
				"stroke-dasharray": "6 5",
			});
			const points = [];
			for (let k = 0; k < n; k++)
				points.push([k / n, (k + 0.5) / n], [(k + 1) / n, (k + 0.5) / n]);
			add(group, "path", {
				d: pathFrom(points, sx, sy),
				fill: "none",
				stroke: colors.comparison,
				"stroke-width": 2.8,
			});
			for (let k = 0; k < n; k++)
				add(group, "circle", {
					cx: sx((k + 0.5) / n),
					cy: sy((k + 0.5) / n),
					r: n > 8 ? 2.2 : 3.2,
					fill: colors.comparison,
				});
			const eta = Math.pow(Math.sin(pi / n) / (pi / n), 2);
			root.querySelector("#sampling-n").textContent = String(n);
			root.querySelector("#sampling-efficiency").textContent =
				fmt(100 * eta, 1) + "%";
			root.querySelector("#sampling-error").textContent = "π/" + n + " rad";
		}
		input.addEventListener("input", draw, { signal });
		watch(root, draw);
		draw();
	}

	function initAdjoint() {
		const root = article.querySelector("#lab-adjoint");
		if (!root) return;
		const svg = root.querySelector("#adjoint-svg"),
			fwd = root.querySelector("#adjoint-forward"),
			probe = root.querySelector("#adjoint-probe");
		let mode = "forward";
		function draw() {
			const width = widthOf(svg),
				height = 340,
				colors = plotColors,
				forward = mode === "forward",
				center = width / 2;
			setupSVG(svg, width, height);
			const defs = add(svg, "defs");
			const marker = add(defs, "marker", {
				id: "adjoint-relation-arrow",
				viewBox: "0 0 10 10",
				refX: 9,
				refY: 5,
				markerWidth: 6,
				markerHeight: 6,
				orient: "auto",
			});
			add(marker, "path", {
				d: "M0,0 L10,5 L0,10 Z",
				fill: forward ? colors.accent : colors.comparison,
			});
			add(
				svg,
				"text",
				{ x: center, y: 24, "text-anchor": "middle" },
				forward ? "原入射源：开启" : "原入射源：不激发",
			);
			add(svg, "circle", {
				cx: center,
				cy: 49,
				r: 7,
				fill: colors.accent,
				opacity: forward ? 1 : 0.2,
			});
			add(svg, "text", { x: 20, y: 128 }, width < 400 ? "器件" : "设计区域");
			add(svg, "rect", {
				x: 20,
				y: 144,
				width: width - 40,
				height: 61,
				rx: 7,
				fill: colors.panel,
				stroke: colors.border,
			});
			const xs = [width * 0.24, width * 0.5, width * 0.76];
			xs.forEach((x, i) => {
				if (forward) {
					add(svg, "path", {
						d: `M${center},59 L${x},139`,
						stroke: colors.accent,
						"stroke-width": 2,
						fill: "none",
						"marker-end": "url(#adjoint-relation-arrow)",
					});
					add(svg, "path", {
						d: `M${x},209 L${center},281`,
						stroke: colors.accent,
						"stroke-width": 2,
						fill: "none",
						"marker-end": "url(#adjoint-relation-arrow)",
					});
				} else
					add(svg, "path", {
						d: `M${center},281 L${x},209`,
						stroke: colors.comparison,
						"stroke-width": 2,
						fill: "none",
						"marker-end": "url(#adjoint-relation-arrow)",
					});
				add(svg, "rect", {
					x: x - 17,
					y: 154,
					width: 34,
					height: 40,
					rx: 4,
					fill: colors.surface,
					stroke: colors.ink,
					"stroke-width": 1.2,
				});
				add(
					svg,
					"text",
					{ x, y: 180, "text-anchor": "middle" },
					["A", "B", "C"][i],
				);
			});
			add(svg, "circle", {
				cx: center,
				cy: 292,
				r: 8,
				fill: forward ? colors.accent : colors.comparison,
			});
			add(
				svg,
				"text",
				{ x: center, y: 325, "text-anchor": "middle" },
				forward ? "F：观察当前焦点场" : "F：单位探针源开启",
			);
			fwd.setAttribute("aria-pressed", String(forward));
			probe.setAttribute("aria-pressed", String(!forward));
			root.querySelector("#adjoint-state").textContent = forward
				? "正向计算获得当前器件中的复电场，包括各可调位置与焦点处的振幅和相位。"
				: "焦点探针一次给出 F 与 A、B、C 等位置的传递信息；正式伴随源加入目标权重后，与正向场组合求梯度。";
		}
		fwd.addEventListener(
			"click",
			() => {
				mode = "forward";
				draw();
			},
			{ signal },
		);
		probe.addEventListener(
			"click",
			() => {
				mode = "probe";
				draw();
			},
			{ signal },
		);
		watch(root, draw);
		draw();
	}

	function initCatenary() {
		const root = article.querySelector("#lab-catenary");
		if (!root) return;
		const svg = root.querySelector("#catenary-svg"),
			position = root.querySelector("#catenary-position"),
			spin = root.querySelector("#catenary-spin");
		function draw() {
			const width = widthOf(svg),
				colors = plotColors,
				size = Math.min(width - 72, 520),
				box = { l: (width - size) / 2 + 7, t: 35, w: size, h: size * 0.7 };
			const height = box.t + box.h + 149;
			setupSVG(svg, width, height);
			const { sx, sy } = axes(
				svg,
				box,
				[-0.5, 0.5],
				[0, 0.7],
				[-0.5, 0, 0.5],
				[0, 0.2, 0.4, 0.6],
				["面内位置 x / Λ", "面内轮廓 y / Λ"],
				colors,
			);
			const group = clip(svg, "catenary-plot-clip", box),
				q = Number(position.value),
				sigma = Number(spin.value),
				xi = pi * q;
			const y = (x) => Math.log(1 / Math.cos(pi * x)) / pi;
			const points = Array.from({ length: 241 }, (_, i) => [
				-0.45 + (0.9 * i) / 240,
				y(-0.45 + (0.9 * i) / 240),
			]);
			add(group, "path", {
				d: pathFrom(points, sx, sy),
				fill: "none",
				stroke: colors.accent,
				"stroke-width": 2.8,
			});
			const tangent = 0.13,
				a = [q - tangent * Math.cos(xi), y(q) - tangent * Math.sin(xi)],
				b = [q + tangent * Math.cos(xi), y(q) + tangent * Math.sin(xi)];
			add(group, "path", {
				d: pathFrom([a, b], sx, sy),
				fill: "none",
				stroke: colors.comparison,
				"stroke-width": 3,
			});
			add(group, "line", {
				x1: sx(q),
				y1: sy(y(q)),
				x2: sx(q) + 34,
				y2: sy(y(q)),
				stroke: colors.muted,
				"stroke-width": 1,
				"stroke-dasharray": "3 3",
			});
			if (Math.abs(xi) > 0.005) {
				const radius = 23,
					ex = sx(q) + radius * Math.cos(xi),
					ey = sy(y(q)) - radius * Math.sin(xi);
				add(group, "path", {
					d: `M${sx(q) + radius},${sy(y(q))} A${radius},${radius} 0 0 ${xi > 0 ? 0 : 1} ${ex},${ey}`,
					fill: "none",
					stroke: colors.comparison,
					"stroke-width": 1.6,
				});
			}
			add(group, "circle", {
				cx: sx(q),
				cy: sy(y(q)),
				r: 5.2,
				fill: colors.surface,
				stroke: colors.accent,
				"stroke-width": 2.5,
			});
			const phasePi = -2 * sigma * q,
				barY = box.t + box.h + 99,
				barX = box.l,
				barW = box.w;
			add(svg, "text", { x: barX, y: barY - 17 }, "交叉圆偏振的 PB 相位");
			add(svg, "line", {
				x1: barX,
				x2: barX + barW,
				y1: barY,
				y2: barY,
				stroke: colors.border,
				"stroke-width": 4,
				"stroke-linecap": "round",
			});
			[
				[-1, "−π"],
				[0, "0"],
				[1, "+π"],
			].forEach(([value, label]) => {
				const x = barX + ((value + 1) / 2) * barW;
				add(svg, "line", {
					x1: x,
					x2: x,
					y1: barY - 4,
					y2: barY + 4,
					stroke: colors.ink,
					"stroke-width": 1,
				});
				add(
					svg,
					"text",
					{
						x,
						y: barY + 24,
						"text-anchor":
							value === -1 ? "start" : value === 1 ? "end" : "middle",
					},
					label,
				);
			});
			add(svg, "circle", {
				cx: barX + ((phasePi + 1) / 2) * barW,
				cy: barY,
				r: 6,
				fill: colors.comparison,
				stroke: colors.surface,
				"stroke-width": 2,
			});
			root.querySelector("#catenary-position-label").textContent = fmt(q, 3);
			root.querySelector("#catenary-angle").textContent =
				fmt((xi * 180) / pi, 1) + "°";
			root.querySelector("#catenary-phase").textContent =
				fmt(phasePi, 2) + "π rad";
			root.querySelector("#catenary-height").textContent = fmt(y(q), 3);
		}
		[position, spin].forEach((el) =>
			el.addEventListener("input", draw, { signal }),
		);
		watch(root, draw);
		draw();
	}
	initPhase();
	initAperture();
	initSampling();
	initAdjoint();
	initCatenary();
}

function mountReaderTools(article, tools, signal) {
	const toc = tools.querySelector("#metalens-toc");
	const progress = tools.querySelector("#toc-progress");
	const percent = tools.querySelector("#reading-percent");
	const chapters = [...article.querySelectorAll("[data-metalens-chapter]")];
	const links = [...toc.querySelectorAll('a[href^="#"]')];
	const readingOffset = 100;
	let frame = 0;
	let activeId;

	function updateReading() {
		frame = 0;
		const { top, height } = article.getBoundingClientRect();
		const distance = Math.max(1, height - window.innerHeight + readingOffset);
		const ratio = Math.max(0, Math.min(1, (readingOffset - top) / distance));
		progress.value = ratio * 100;
		percent.textContent = Math.round(ratio * 100) + "%";

		let current = chapters[0];
		for (const chapter of chapters) {
			if (chapter.getBoundingClientRect().top > readingOffset) break;
			current = chapter;
		}
		if (current.id === activeId) return;
		activeId = current.id;
		for (const link of links) {
			if (link.hash === "#" + activeId)
				link.setAttribute("aria-current", "location");
			else link.removeAttribute("aria-current");
		}
	}

	function queueReadingUpdate() {
		if (!frame) frame = requestAnimationFrame(updateReading);
	}
	article.addEventListener("toggle", queueReadingUpdate, {
		signal,
		capture: true,
	});
	window.addEventListener("scroll", queueReadingUpdate, {
		signal,
		passive: true,
	});
	window.addEventListener("resize", queueReadingUpdate, {
		signal,
		passive: true,
	});
	signal.addEventListener("abort", () => cancelAnimationFrame(frame), {
		once: true,
	});
	updateReading();

	toc.addEventListener(
		"click",
		(event) => {
			if (event.target.closest("a")) toc.open = false;
		},
		{ signal },
	);

	const expand = article.querySelector("#expand-derivations");
	const derivations = [...article.querySelectorAll(".metalens-derivation")];
	expand.addEventListener(
		"click",
		() => {
			const open = expand.getAttribute("aria-pressed") !== "true";
			for (const details of derivations) details.open = open;
			expand.setAttribute("aria-pressed", String(open));
			expand.textContent = open ? "收起补充推导" : "展开补充推导";
		},
		{ signal },
	);

	let printStates;
	const figures = [...article.querySelectorAll(".paper-figure img")];
	const printButton = tools.querySelector("#print-page");
	window.addEventListener(
		"beforeprint",
		() => {
			printStates = derivations.map((details) => details.open);
			for (const details of derivations) details.open = true;
			for (const figure of figures) figure.loading = "eager";
		},
		{ signal },
	);
	window.addEventListener(
		"afterprint",
		() => {
			if (!printStates) return;
			derivations.forEach((details, index) => {
				details.open = printStates[index];
			});
			printStates = undefined;
		},
		{ signal },
	);
	printButton.addEventListener(
		"click",
		async () => {
			printButton.disabled = true;
			printButton.textContent = "正在加载论文图…";
			try {
				await Promise.allSettled(
					figures.map((figure) => {
						figure.loading = "eager";
						return figure.decode();
					}),
				);
				if (!signal.aborted) window.print();
			} finally {
				printButton.disabled = false;
				printButton.textContent = "打印 / PDF";
			}
		},
		{ signal },
	);

	const dialog = article.querySelector("#figure-dialog");
	const image = dialog.querySelector("#dialog-image");
	const label = dialog.querySelector("#dialog-title");
	const wrap = dialog.querySelector("#dialog-image-wrap");
	const sizeToggle = dialog.querySelector(".dialog-image-toggle");

	// Use the reader's original-size dialog for these figures.
	article.addEventListener(
		"click",
		(event) => {
			const button = event.target.closest(".zoom-button");
			if (!button) return;
			event.stopPropagation();
			const source = button.querySelector("img");
			image.src = source.currentSrc || source.src;
			image.alt = source.alt;
			label.textContent = button.dataset.title;
			wrap.classList.remove("full");
			sizeToggle.setAttribute("aria-pressed", "false");
			dialog.showModal();
		},
		{ signal, capture: true },
	);
	sizeToggle.addEventListener(
		"click",
		(event) => {
			event.stopPropagation();
			sizeToggle.setAttribute(
				"aria-pressed",
				String(wrap.classList.toggle("full")),
			);
		},
		{ signal, capture: true },
	);
	dialog
		.querySelector("#close-figure")
		.addEventListener("click", () => dialog.close(), { signal });
	dialog.addEventListener(
		"click",
		(event) => {
			if (event.target !== dialog) return;
			const { left, right, top, bottom } = dialog.getBoundingClientRect();
			if (
				event.clientX < left ||
				event.clientX > right ||
				event.clientY < top ||
				event.clientY > bottom
			)
				dialog.close();
		},
		{ signal },
	);
}

class MetalensReader extends HTMLElement {
	connectedCallback() {
		this.controller = new AbortController();
		this.frame = requestAnimationFrame(() => {
			const article = this.closest(".markdown-content");
			if (!article) return;
			const { signal } = this.controller;
			mountLabs(article, signal);
			mountReaderTools(article, this, signal);
		});
	}

	disconnectedCallback() {
		cancelAnimationFrame(this.frame);
		this.controller.abort();
	}
}

if (!customElements.get("metalens-reader")) {
	customElements.define("metalens-reader", MetalensReader);
}
