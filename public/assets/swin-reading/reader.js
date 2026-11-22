const windowSteps = [
    ["固定 W-MSA", "原图分成四个 4×4 的固定窗口。点选一个 Token，可以看到同一窗口中的 16 个位置。A、B、C、D 标示原图的四个区域。"],
    ["直接移动窗口", "把窗口边界偏移 2 格，每个方向划分为 2、4、2 格，得到 9 个大小不同的窗口。点选边缘和中心的 Token，比较它们各自能看到多大的区域。"],
    ["Cyclic Shift", "把网格向上、向左循环移动 2 格，仍可按四个 4×4 窗口批量计算。观察右下窗口，来自原图两端的 Token 被移到了同一个计算窗口。"],
    ["Attention Mask", "绿框内的位置可以相互注意。红色虚框标出同一计算窗口内被 Mask 屏蔽的位置。点选不同的 Token，看看哪些邻接关系来自循环回绕。"],
    ["Reverse Cyclic Shift", "将窗口输出向下、向右循环移回 2 格。Token 回到原始坐标，模型中的特征值已经经过注意力更新。"],
];

function mountWindowLab(lab, signal) {
    const size = 8;
    const windowSize = 4;
    const shift = 2;
    const grid = lab.querySelector("#windowGrid");
    const steps = Array.from(lab.querySelectorAll("[data-step]"));
    const title = lab.querySelector("#demoTitle");
    const explanation = lab.querySelector("#demoDesc");
    const status = lab.querySelector("#demoStat");
    let step = 0;
    let selected = { row: 3, col: 3 };

    const cells = Array.from({ length: size * size }, (_, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "tile";
        button.dataset.index = index;
        return button;
    });
    const guides = document.createElement("div");
    guides.className = "swin-guides";
    guides.setAttribute("aria-hidden", "true");
    grid.replaceChildren(...cells, guides);

    function shiftedBucket(x) {
        return Math.floor((x + shift) / windowSize);
    }
    function render() {
        const rolled = step === 2 || step === 3;
        const display = (x) => rolled ? (x - shift + size) % size : x;
        const original = (x) => rolled ? (x + shift) % size : x;
        const bucket = step === 1 ? shiftedBucket : (x) => Math.floor(x / windowSize);
        const sr = display(selected.row);
        const sc = display(selected.col);
        let allowedCount = 0;
        let maskedCount = 0;
        cells.forEach((button, index) => {
            const row = Math.floor(index / size);
            const col = index % size;
            const origRow = original(row);
            const origCol = original(col);
            const group = "ABCD"[Math.floor(origRow / windowSize) * 2 + Math.floor(origCol / windowSize)];
            const inWindow = step !== 4 && bucket(row) === bucket(sr) && bucket(col) === bucket(sc);
            // The mask must recover the same neighborhoods as directly shifting the window boundaries.
            const masked = step === 3 && inWindow && (
                shiftedBucket(origRow) !== shiftedBucket(selected.row) ||
                shiftedBucket(origCol) !== shiftedBucket(selected.col)
            );
            const chosen = row === sr && col === sc;
            if (masked) maskedCount++;
            else if (inWindow) allowedCount++;
            button.textContent = group;
            button.dataset.group = group;
            button.classList.toggle("allowed", inWindow && !masked);
            button.classList.toggle("blocked", masked);
            button.setAttribute("aria-pressed", String(chosen));
            button.setAttribute("aria-label", `区域 ${group}，源坐标 (${origRow},${origCol})`);
        });
        steps.forEach((button, index) => button.setAttribute("aria-pressed", String(index === step)));
        guides.replaceChildren();
        for (const position of step === 1 ? [2, 6] : step === 3 ? [4, 6] : [4]) {
            for (const axis of ["row", "col"]) {
                const line = document.createElement("span");
                line.className = axis + (step === 3 && position === 6 ? " mask-boundary" : "");
                line.style.setProperty("--offset", `${position / size * 100}%`);
                guides.append(line);
            }
        }
        title.textContent = `${step + 1} · ${windowSteps[step][0]}`;
        explanation.textContent = windowSteps[step][1];
        const coordinates = `源 Token (${selected.row},${selected.col}) → 展示坐标 (${sr},${sc})`;
        status.textContent = step === 4 ? `${coordinates} · 已恢复空间排列`
            : `${coordinates} · 可关注 ${allowedCount} 格` + (step === 3 ? ` · 同窗被 Mask ${maskedCount} 格` : "");
    }
    lab.querySelector("#demoControls").addEventListener("click", (event) => {
        const button = event.target.closest("button[data-step]");
        if (!button) return;
        step = Number(button.dataset.step);
        if (step === 3) selected = { row: 0, col: 0 };
        render();
    }, { signal });
    grid.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-index]");
        if (!button) return;
        const index = Number(button.dataset.index);
        const offset = step === 2 || step === 3 ? shift : 0;
        selected = { row: (Math.floor(index / size) + offset) % size, col: (index % size + offset) % size };
        render();
    }, { signal });
    render();
}

function mountPositionLab(lab, signal) {
    const grid = lab.querySelector("#positionGrid");
    const detail = lab.querySelector("#positionDetails");
    const labels = "ABCDEFGHI";
    let query = 4;
    let key = 5;
    let choosingQuery = true;
    const cells = Array.from(labels, (label, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = label;
        button.dataset.index = index;
        return button;
    });
    grid.replaceChildren(...cells);
    function render() {
        cells.forEach((button, i) => {
            button.classList.toggle("query", i === query);
            button.classList.toggle("key", i === key);
            const role = [i === query && "Query", i === key && "Key"].filter(Boolean).join("、");
            button.setAttribute("aria-label", `位置 ${labels[i]}${role ? "，" + role : ""}`);
        });
        const dr = Math.floor(key / 3) - Math.floor(query / 3);
        const dc = key % 3 - query % 3;
        const index = (dr + 2) * 5 + dc + 2;
        const signed = (n) => n > 0 ? `+${n}` : String(n);
        detail.innerHTML = `<strong>Query · ${labels[query]}　 Key · ${labels[key]}</strong>
            <p>Δ行 = ${signed(dr)}，Δ列 = ${signed(dc)}</p>
            <p>按 Key − Query 计算，5×5 偏置表的索引为 (${dr} + 2) × 5 + (${dc} + 2) = <b>${index}</b>。</p>
            <small>下一次点击设置 ${choosingQuery ? "Query" : "Key"}。实际实现也可采用相反的位移符号约定，查表时需保持一致。</small>`;
    }
    grid.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-index]");
        if (!button) return;
        if (choosingQuery) query = Number(button.dataset.index);
        else key = Number(button.dataset.index);
        choosingQuery = !choosingQuery;
        render();
    }, { signal });
    render();
}

function mountQuiz(quiz, signal) {
    const questions = Array.from(quiz.querySelectorAll("fieldset"));
    const score = quiz.querySelector("output");
    let graded = false;
    function grade() {
        graded = true;
        let correct = 0;
        let answered = 0;
        for (const question of questions) {
            const choice = question.querySelector("input:checked");
            let feedback = "本题尚未选择。";
            if (choice) {
                answered++;
                const matches = choice.value === question.dataset.answer;
                if (matches) correct++;
                feedback = matches ? "✓ 正确。" : "✗ 还需要复习。";
            }
            question.querySelector(".quiz-result").textContent = feedback + question.dataset.explain;
        }
        score.textContent = `得分 ${correct}/${questions.length}（已作答 ${answered} 题）`;
    }
    quiz.querySelector("#checkQuiz").addEventListener("click", grade, { signal });
    quiz.addEventListener("change", () => { if (graded) grade(); }, { signal });
    quiz.querySelector("#resetQuiz").addEventListener("click", () => {
        graded = false;
        for (const input of quiz.querySelectorAll("input")) input.checked = false;
        for (const result of quiz.querySelectorAll(".quiz-result")) result.textContent = "";
        score.textContent = "";
    }, { signal });
}

class SwinHandbookTools extends HTMLElement {
    connectedCallback() {
        this.controller = new AbortController();
        this.frame = requestAnimationFrame(() => {
            const article = this.closest(".markdown-content");
            if (!article) return;
            const { signal } = this.controller;
            mountWindowLab(article.querySelector("#swin-window-lab"), signal);
            mountPositionLab(article.querySelector("#swin-position-lab"), signal);
            mountQuiz(article.querySelector("#quizContainer"), signal);
            for (const box of article.querySelectorAll("input[data-task]")) {
                const key = "swin-" + box.dataset.task;
                try { box.checked = localStorage.getItem(key) === "1"; } catch { /* Storage is optional. */ }
                box.addEventListener("change", () => {
                    try { localStorage.setItem(key, box.checked ? "1" : "0"); } catch { /* Continue in this tab. */ }
                }, { signal });
            }
            this.querySelector("[data-print]").addEventListener("click", () => window.print(), { signal });
            const progress = this.querySelector("progress");
            const updateProgress = () => {
                const rect = article.getBoundingClientRect();
                progress.value = 100 * -rect.top / Math.max(1, rect.height - window.innerHeight);
            };
            window.addEventListener("scroll", updateProgress, { passive: true, signal });
            window.addEventListener("resize", updateProgress, { signal });
            updateProgress();
        });
    }
    disconnectedCallback() {
        cancelAnimationFrame(this.frame);
        this.controller.abort();
    }
}
if (!customElements.get("swin-handbook-tools")) customElements.define("swin-handbook-tools", SwinHandbookTools);
