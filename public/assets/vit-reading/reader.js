// This site is deliberately standalone. Progress stays in the reader's browser.
const lessons = [
	{
		id: "ch0",
		questions: [
			{
				q: "这篇论文的核心研究问题是什么？",
				opts: [
					"证明所有视觉任务都不再需要 CNN",
					"检验标准 Transformer 能否直接处理图像 Patch 并用于分类",
					"把所有像素独立预测为文本 Token",
				],
				answer: 1,
				why: "作者以尽量少的修改将标准 Transformer 用于图像 Patch 序列，并用图像分类实验检验效果。",
			},
			{
				q: "CNN 的“局部性”作为归纳偏置，意味着什么？",
				opts: [
					"卷积结构倾向于利用空间邻域的信息",
					"CNN 不允许提取全局特征",
					"CNN 不需要任何训练数据",
				],
				answer: 0,
				why: "局部卷积将邻域结构写入模型，但多层 CNN 仍然可以建立更大感受野。",
			},
			{
				q: "原论文关于 ViT 表现的最准确表述是？",
				opts: [
					"只要使用 Attention 就总比 CNN 好",
					"只有把图片像素逐个输入才有效",
					"大规模预训练下 ViT 能取得有竞争力的分类结果",
				],
				answer: 2,
				why: "论文强调大规模预训练与下游迁移，不能无限外推到所有数据规模和任务。",
			},
		],
		recap:
			"不用看原文，解释：CNN 的局部归纳偏置是什么？ViT 的研究问题是什么？为什么数据规模会影响结论？",
	},
	{
		id: "ch1",
		questions: [
			{
				q: "224×224 RGB 图像，以 16×16 Patch 切分，Patch 数量是多少？",
				opts: ["196", "197", "768"],
				answer: 0,
				why: "N=(224/16)²=14²=196；197 是再加入一个 Class Token 后的长度。",
			},
			{
				q: "加入一个 Class Token 以后，Token 序列的长度是多少？",
				opts: ["196", "197", "3072"],
				answer: 1,
				why: "196 个 Patch Token + 1 个 Class Token = 197。",
			},
			{
				q: "Position Embedding 在这篇论文中的主要作用是？",
				opts: [
					"让所有位置的 Patch 完全一样",
					"把图片从 RGB 转成灰度",
					"向 Token 提供位置信息",
				],
				answer: 2,
				why: "作者使用可学习的一维位置嵌入，帮助模型保留图像区域的位置信息。",
			},
		],
		recap:
			"不看表格，手算 ViT-B/16 的 N、N+1，并解释为什么还需要 Class Token 和 Position Embedding。",
	},
	{
		id: "ch2",
		questions: [
			{
				q: "仅在某个逐 Token MLP 内部改变 Token 2，Token 1 的输出会直接变化吗？",
				opts: [
					"会，MLP 会自动读取所有 Token",
					"不会，MLP 分别处理每个 Token",
					"无法判断，因为 MLP 是卷积",
				],
				answer: 1,
				why: "逐 Token MLP 使用共享参数对每一行变换，单次运算不直接读取其他 Token 行。",
			},
			{
				q: "Self-Attention 能实现跨 Token 信息聚合，主要体现在哪一步？",
				opts: [
					"用权重矩阵 A 对 V 做加权求和",
					"只把每个 Token 乘以独立常数",
					"只调用 GELU",
				],
				answer: 0,
				why: "oᵢ=ΣⱼAᵢⱼvⱼ，明确允许第 i 个 Token 使用其他 Token 的 Value。",
			},
			{
				q: "为什么不能说“经过 MLP 的 Token 一定不包含其他 Token 的信息”？",
				opts: [
					"因为 MLP 自带注意力矩阵",
					"因为 MLP 会自动读取整张图",
					"因为 MLP 的输入可能已在前面的注意力层中融合了其他 Token",
				],
				answer: 2,
				why: "“本模块不直接混合 Token”不等于“输入和输出从未包含跨 Token 信息”。",
			},
		],
		recap:
			"用“猫耳朵、猫身体、猫尾巴”三个 Token 为例，分别解释 MLP 和 Self-Attention 是怎么更新猫耳朵 Token 的。",
	},
	{
		id: "ch3",
		questions: [
			{
				q: "在 Self-Attention 中，Q、K、V 通常来自哪里？",
				opts: [
					"同一个输入 X 的不同可学习投影",
					"三个相互无关的原始数据集",
					"三个固定随机常量",
				],
				answer: 0,
				why: "Q=XWQ、K=XWK、V=XWV。它们来自同一个 X，但使用不同投影参数。",
			},
			{
				q: "ViT-B/16 单个注意力头中，QKᵀ 的形状是什么？",
				opts: ["768×768", "197×197", "197×64"],
				answer: 1,
				why: "Q 和 K 是 197×64，因此 QKᵀ 是 (197×64)·(64×197)=197×197。",
			},
			{
				q: "12 个头各输出 197×64，拼接后形状是多少？",
				opts: ["2364×64", "197×64", "197×768"],
				answer: 2,
				why: "沿特征维拼接：12×64=768，Token 数量依然为 197。",
			},
		],
		recap:
			"不看推导，按顺序讲清：QKV 从哪里来、QKᵀ 得到什么、为什么 Softmax、为什么 AV 能交换信息、多头如何拼接。",
	},
	{
		id: "ch4",
		questions: [
			{
				q: "论文公式 (2) 中的 LayerNorm 位于哪个位置？",
				opts: [
					"在 MSA 之后、残差之前",
					"在 MSA 之前（Pre-LN）",
					"在最后分类概率之后",
				],
				answer: 1,
				why: "z′ℓ=MSA(LN(zℓ−1))+zℓ−1，先 LN 后 MSA，最后加残差。",
			},
			{
				q: "ViT-Base 的 MLP 隐藏维度变化是？",
				opts: ["768→3072→768", "197→197→197", "768→64→12"],
				answer: 0,
				why: "论文 Table 1 给出 ViT-Base D=768、MLP size=3072。",
			},
			{
				q: "论文公式 (4) 中 y 是什么？",
				opts: [
					"一个已经归一化到 0–1 的类别概率",
					"所有 197 个 Token 的逐类概率",
					"最终 Class Token 的归一化特征表示",
				],
				answer: 2,
				why: "y=LN(z_L^0) 是图像表示，之后仍需分类头产生类别 logits。",
			},
		],
		recap:
			"依次写下 Encoder 的两个残差公式，解释 Pre-LN 的位置，以及为什么需要保持 197×768 的张量形状。",
	},
	{
		id: "ch5",
		questions: [
			{
				q: "Figure 3：只在 ImageNet 上预训练时，ViT-B/16 与 ViT-L/16 哪个准确率更高？",
				opts: ["ViT-L/16", "ViT-B/16", "两者完全相同"],
				answer: 1,
				why: "Table 5：ViT-B/16=77.91%，ViT-L/16=76.53%。更大模型并不一定在小数据下更好。",
			},
			{
				q: "Figure 4 为什么从同一 JFT 数据源抽取不同规模的子集？",
				opts: [
					"为了减少更换数据集来源带来的干扰",
					"为了证明所有数据都没有噪声",
					"为了让模型只学习 5 个 ImageNet 类别",
				],
				answer: 0,
				why: "控制数据来源可更清楚地考察样本规模效应；5-shot 指迁移评价时每类仅用少量标注样本。",
			},
			{
				q: "Figure 5 关于计算效率的正确解读是？",
				opts: [
					"ViT 一定在每个 GPU 上推理最快",
					"同准确率时计算量越往右越少",
					"在该实验中，达到相近迁移性能的 ViT 往往使用更少预训练计算量",
				],
				answer: 2,
				why: "横轴越右计算量越大。Figure 5 衡量预训练 FLOPs，不直接等于推理时延。",
			},
		],
		recap:
			"分别用一句话解释 Figure 3、4、5 的横纵轴、主要观察结果，以及每张图不能证明什么。",
	},
	{
		id: "ch6",
		questions: [
			{
				q: "Figure 7 中间的位置编码相似度可视化主要说明什么？",
				opts: [
					"ViT 已经精确预测相机位姿",
					"可学习位置编码能够形成一定的二维空间关系",
					"模型没有学到任何空间信息",
				],
				answer: 1,
				why: "作者观察到邻近位置与行列结构；这是二维位置拓扑的证据，不是三维理解的证明。",
			},
			{
				q: "Figure 7 右图显示了什么现象？",
				opts: [
					"浅层头只关注自己，深层头从不关注远处",
					"所有头的注意力距离在每层都一样",
					"浅层局部和全局头并存，平均注意距离总体随深度增加",
				],
				answer: 2,
				why: "不同头的空间注意跨度不同，深层总体更加偏向较远范围的信息聚合。",
			},
			{
				q: "下面哪种论文结论属于过度外推？",
				opts: [
					"ViT 在论文实验条件下具有强竞争力",
					"由于 Figure 7 可视化了注意力，因此已经证明注意力头对最终预测的因果作用",
					"原论文把检测与分割列为未来方向",
				],
				answer: 1,
				why: "注意力可视化是描述性分析，不单独构成因果机制的验证。",
			},
		],
		recap:
			"解释 Figure 7 左中右三个图分别展示什么，并给出一个“论文不能证明”的结论。",
	},
];

const STORAGE_KEY = "vit-interactive-reading-v1";
function mountReader(reader) {
	const byId = (id) => reader.querySelector("#" + id);
	const emptyState = () => ({ answers: {}, teachbacks: {} });
	let learner = emptyState();
	let canPersist = true;
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			const parsed = JSON.parse(saved);
			if (parsed && typeof parsed === "object")
				learner = {
					answers: parsed.answers || {},
					teachbacks: parsed.teachbacks || {},
				};
		}
	} catch (err) {
		canPersist = false;
	}
	const fmt = (n) => new Intl.NumberFormat("zh-CN").format(n);
	function save() {
		if (!canPersist) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(learner));
		} catch (err) {
			canPersist = false;
			byId("save-note").textContent =
				"当前浏览器禁止本地存储：测验仍可使用，但刷新后进度可能丢失。可先导出报告。";
		}
	}
	function detailsFor(id) {
		const L = lessons.find((x) => x.id === id);
		const answers = learner.answers[id] || {};
		let answered = 0,
			correct = 0;
		L.questions.forEach((q, i) => {
			if (Number.isInteger(answers[i])) {
				answered++;
				if (answers[i] === q.answer) correct++;
			}
		});
		const passed = correct === L.questions.length;
		const mastered = passed && !!learner.teachbacks[id];
		return { answered, correct, passed, mastered, total: L.questions.length };
	}
	function renderNavigation() {
		const ul = byId("nav-list");
		ul.innerHTML = "";
		lessons.forEach((L, i) => {
			let li = document.createElement("li");
			let a = document.createElement("a");
			a.href = "#" + L.id;
			a.className = "nav-link";
			a.dataset.target = L.id;
			a.innerHTML =
				'<span class="nav-num">' +
				String(i + 1).padStart(2, "0") +
				'</span><span class="nav-title"></span><span class="nav-status" aria-hidden="true"></span>';
			a.querySelector(".nav-title").textContent = byId(L.id).dataset.navLabel;
			li.appendChild(a);
			ul.appendChild(li);
		});
	}
	function createQuizzes() {
		for (const L of lessons) {
			const mount = reader.querySelector('[data-study="' + L.id + '"]');
			mount.innerHTML = "";
			const head = document.createElement("div");
			head.className = "study-head";
			head.innerHTML =
				'<h3>本章自测</h3><span class="chapter-state"></span><span class="score-pill" id="score-' +
				L.id +
				'">0 / 3</span>';
			mount.appendChild(head);
			const desc = document.createElement("p");
			desc.className = "study-desc";
			desc.textContent = "选择答案即可获得即时反馈。改选会重新计算成绩。";
			mount.appendChild(desc);
			L.questions.forEach((q, i) => {
				const field = document.createElement("fieldset");
				field.className = "question";
				field.dataset.qIndex = i;
				const leg = document.createElement("legend");
				leg.textContent = "题 " + (i + 1) + " · " + q.q;
				field.appendChild(leg);
				const opts = document.createElement("div");
				opts.className = "question-options";
				q.opts.forEach((opt, j) => {
					const label = document.createElement("label");
					label.className = "option";
					const input = document.createElement("input");
					input.type = "radio";
					input.name = L.id + "-q" + i;
					input.value = j;
					input.checked = (learner.answers[L.id] || {})[i] === j;
					input.setAttribute("aria-label", opt);
					const span = document.createElement("span");
					span.textContent = opt;
					label.append(input, span);
					opts.appendChild(label);
				});
				field.appendChild(opts);
				const fb = document.createElement("p");
				fb.className = "feedback";
				fb.setAttribute("role", "status");
				field.appendChild(fb);
				mount.appendChild(field);
			});
			const tb = document.createElement("div");
			tb.className = "teachback";
			const lb = document.createElement("label");
			const ck = document.createElement("input");
			ck.type = "checkbox";
			ck.className = "teachback-check";
			ck.checked = !!learner.teachbacks[L.id];
			const ct = document.createElement("span");
			ct.textContent = "我已经合上讲解，能用自己的话复述本章核心概念";
			lb.append(ck, ct);
			tb.appendChild(lb);
			const sm = document.createElement("small");
			sm.textContent =
				"这一步靠自我判断；必须同时答对全部 3 题，才显示“已掌握（自测）”。";
			tb.appendChild(sm);
			const dt = document.createElement("details");
			const summ = document.createElement("summary");
			summ.textContent = "查看本章口头复述提纲";
			const txt = document.createElement("p");
			txt.textContent = L.recap;
			dt.append(summ, txt);
			tb.appendChild(dt);
			mount.appendChild(tb);
			mount.addEventListener("change", (ev) => {
				const target = ev.target;
				if (target.matches("input[type=radio]")) {
					const f = target.closest("fieldset");
					const ix = Number(f.dataset.qIndex);
					learner.answers[L.id] ||= {};
					learner.answers[L.id][ix] = Number(target.value);
					save();
					updateQuizUI(L.id);
					updateGlobal();
				} else if (target.classList.contains("teachback-check")) {
					learner.teachbacks[L.id] = target.checked;
					save();
					updateQuizUI(L.id);
					updateGlobal();
				}
			});
			updateQuizUI(L.id);
		}
	}
	function updateQuizUI(id) {
		const L = lessons.find((l) => l.id === id);
		const mount = reader.querySelector('[data-study="' + id + '"]');
		const answers = learner.answers[id] || {};
		for (let i = 0; i < L.questions.length; i++) {
			const q = L.questions[i];
			const field = mount.querySelector('[data-q-index="' + i + '"]');
			const val = answers[i];
			field.querySelectorAll(".option").forEach((opt, j) => {
				opt.classList.toggle("selected", val === j);
				opt.classList.toggle("correct", val === j && val === q.answer);
				opt.classList.toggle("wrong", val === j && val !== q.answer);
				opt.querySelector("input").checked = val === j;
			});
			const fb = field.querySelector(".feedback");
			const chosen = Number.isInteger(val);
			fb.classList.toggle("visible", chosen);
			fb.classList.toggle("good", chosen && val === q.answer);
			fb.classList.toggle("bad", chosen && val !== q.answer);
			fb.textContent = chosen
				? (val === q.answer ? "✓ 回答正确。" : "↻ 这题还需要复习。") + q.why
				: "";
		}
		const s = detailsFor(id);
		const score = byId("score-" + id);
		score.textContent = s.correct + " / " + s.total + " 正确";
		score.className =
			"score-pill" + (s.mastered ? " mastered" : s.passed ? " passed" : "");
		const state = mount.querySelector(".chapter-state");
		const label = s.mastered
			? "已掌握（自测）"
			: s.passed
				? "已通过测验"
				: s.answered > 0
					? "学习中"
					: "未开始";
		state.textContent = label;
		state.className =
			"chapter-state" + (s.mastered ? " mastered" : s.passed ? " passed" : "");
	}
	function updateGlobal() {
		const statuses = lessons.map((L) => detailsFor(L.id));
		const mastered = statuses.filter((s) => s.mastered).length;
		const answered = statuses.reduce((a, s) => a + s.answered, 0);
		byId("hero-count").textContent =
			mastered + " / " + lessons.length + " 章已掌握";
		byId("vit-progress").value = mastered;
		byId("hero-answers").textContent =
			"已作答 " + answered + " / " + lessons.length * 3 + " 题";
		reader.querySelectorAll("#nav-list .nav-link").forEach((a, i) => {
			const s = statuses[i];
			const dot = a.querySelector(".nav-status");
			dot.className =
				"nav-status" +
				(s.mastered
					? " mastered"
					: s.passed
						? " passed"
						: s.answered > 0
							? " inprogress"
							: "");
			const label = s.mastered
				? "已掌握（自测）"
				: s.passed
					? "已通过测验"
					: s.answered > 0
						? "学习中"
						: "未开始";
			a.title = a.querySelector(".nav-title").textContent + "：" + label;
			dot.textContent = label;
			dot.removeAttribute("aria-hidden");
		});
	}
	function initPatchDemo() {
		const select = byId("patch-size");
		const g = byId("patch-grid");
		function update() {
			const P = Number(select.value);
			const per = 224 / P;
			const n = per * per;
			const t = n + 1;
			g.style.gridTemplateColumns = "repeat(" + per + ", 1fr)";
			const frag = document.createDocumentFragment();
			for (let i = 0; i < n; i++) {
				let cell = document.createElement("span");
				cell.className = "patch-cell";
				frag.appendChild(cell);
			}
			g.replaceChildren(frag);
			g.setAttribute(
				"aria-label",
				per + "×" + per + " 的 Patch 网格，共 " + n + " 个 Patch",
			);
			byId("patch-n").textContent = fmt(n);
			byId("patch-tokens").textContent = fmt(t);
			byId("patch-attn").textContent = fmt(t * t);
			byId("patch-ratio").textContent = ((t * t) / (50 * 50)).toFixed(1) + "×";
		}
		select.addEventListener("change", update);
		update();
	}
	function initAttentionDemo() {
		const names = ["Token 1 / Key 1", "Token 2 / Key 2", "Token 3 / Key 3"];
		const starts = [2, 1, 0];
		const scores = byId("score-controls"),
			weights = byId("weight-list");
		const sliders = [];
		const bars = [];
		for (let i = 0; i < 3; i++) {
			const s = document.createElement("div");
			s.className = "range-control";
			s.innerHTML =
				'<label for="score-' +
				i +
				'"><span>' +
				names[i] +
				'</span><output id="score-value-' +
				i +
				'">' +
				starts[i].toFixed(1) +
				'</output></label><input id="score-' +
				i +
				'" type="range" min="-3" max="3" step="0.1" value="' +
				starts[i] +
				'" aria-label="' +
				names[i] +
				' 的注意力分数">';
			scores.appendChild(s);
			sliders.push(s.querySelector("input"));
			const w = document.createElement("div");
			w.className = "weight-item";
			w.innerHTML =
				'<div class="weight-head"><span>α' +
				(i + 1) +
				'</span><span id="weight-value-' +
				i +
				'">0%</span></div><div class="weight-track"><div class="weight-fill"></div></div>';
			weights.appendChild(w);
			bars.push(w.querySelector(".weight-fill"));
		}
		function update() {
			const x = sliders.map((t) => Number(t.value));
			const peak = Math.max(...x);
			const es = x.map((v) => Math.exp(v - peak));
			const tot = es.reduce((a, b) => a + b, 0);
			const a = es.map((v) => v / tot);
			for (let i = 0; i < 3; i++) {
				byId("score-value-" + i).textContent = x[i].toFixed(1);
				byId("weight-value-" + i).textContent = (a[i] * 100).toFixed(1) + "%";
				bars[i].style.width = (a[i] * 100).toFixed(1) + "%";
			}
			const o1 = a[0] + a[2],
				o2 = a[1] + a[2];
			byId("attention-output").textContent =
				"AV 输出 o = (" + o1.toFixed(3) + ", " + o2.toFixed(3) + ")";
		}
		sliders.forEach((el) => el.addEventListener("input", update));
		update();
	}
	function makeReport() {
		const date = new Date().toLocaleString("zh-CN");
		let out = [
			"ViT 论文互动精读 · 学习报告",
			"生成时间：" + date,
			"论文：Dosovitskiy et al., ICLR 2021",
			"说明：此报告由学习者本地自测生成，不能视为正式考试证明。",
			"",
		];
		let master = 0;
		let answered = 0;
		for (const L of lessons) {
			const s = detailsFor(L.id);
			answered += s.answered;
			master += Number(s.mastered);
			const name = byId(L.id).dataset.navLabel;
			out.push(
				name +
					"｜" +
					s.correct +
					"/3 答对｜" +
					(s.mastered
						? "已掌握（自测）"
						: s.passed
							? "已通过测验"
							: s.answered
								? "学习中"
								: "未开始") +
					"｜已复述：" +
					(learner.teachbacks[L.id] ? "是" : "否"),
			);
		}
		out.splice(
			4,
			0,
			"总进度：" +
				master +
				"/" +
				lessons.length +
				" 章已掌握；" +
				answered +
				"/" +
				lessons.length * 3 +
				" 题已作答",
		);
		return out.join("\n");
	}
	function downloadText(content, name) {
		const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
		const a = document.createElement("a");
		const url = URL.createObjectURL(blob);
		a.href = url;
		a.download = name;
		document.body.append(a);
		a.click();
		a.remove();
		setTimeout(() => URL.revokeObjectURL(url), 3000);
	}
	function actionButtons() {
		byId("export-progress").addEventListener("click", () =>
			downloadText(makeReport(), "ViT-学习报告.txt"),
		);
		byId("copy-progress").addEventListener("click", async () => {
			const btn = byId("copy-progress");
			try {
				if (!navigator.clipboard?.writeText)
					throw new Error("clipboard unavailable");
				await navigator.clipboard.writeText(makeReport());
				btn.textContent = "已复制 ✓";
				setTimeout(() => (btn.textContent = "复制进度摘要"), 1800);
			} catch (err) {
				downloadText(makeReport(), "ViT-学习报告.txt");
				btn.textContent = "已改为下载报告";
				setTimeout(() => (btn.textContent = "复制进度摘要"), 2200);
			}
		});
		byId("reset-progress").addEventListener("click", () => {
			if (!window.confirm("确认重置当前浏览器的所有学习进度？此操作无法撤销。"))
				return;
			learner = emptyState();
			save();
			for (const L of lessons) {
				const ck = reader.querySelector(
					'[data-study="' + L.id + '"] .teachback-check',
				);
				ck.checked = false;
				updateQuizUI(L.id);
			}
			updateGlobal();
		});
	}

	renderNavigation();
	createQuizzes();
	updateGlobal();
	initPatchDemo();
	initAttentionDemo();
	actionButtons();
	if (!canPersist)
		byId("save-note").textContent =
			"此浏览器可能禁止 localStorage，进度刷新后不一定保留；可以导出文本报告。";
}

class VitLearningProgress extends HTMLElement {
	connectedCallback() {
		this.frame = requestAnimationFrame(() => {
			if (!this.isConnected || this.initialized) return;
			const reader = this.closest(".markdown-content");
			if (!reader) return;
			mountReader(reader);
			this.initialized = true;
		});
	}
	disconnectedCallback() {
		cancelAnimationFrame(this.frame);
	}
}
if (!customElements.get("vit-learning-progress")) {
	customElements.define("vit-learning-progress", VitLearningProgress);
}
