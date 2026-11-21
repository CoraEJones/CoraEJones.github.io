class TransformerDimensions extends HTMLElement {
    connectedCallback() {
        const form = this.querySelector("form");
        const fieldset = form.querySelector("fieldset");
        const inputs = {
            tokens: form.elements.namedItem("tokens"),
            model: form.elements.namedItem("model"),
            heads: form.elements.namedItem("heads"),
        };
        const labels = { tokens: "Token 数", model: "模型宽度", heads: "头数" };
        const error = this.querySelector("[data-error]");
        const results = this.querySelector("[data-results]");
        const cells = results.querySelectorAll("[data-value]");

        const update = () => {
            const { tokens, model, heads } = inputs;
            const invalid = Object.entries(inputs).find(([, input]) => !input.validity.valid);
            let invalidInput;
            let message = "";

            if (invalid) {
                const [name, input] = invalid;
                invalidInput = input;
                message = `${labels[name]}请输入 ${input.min} 到 ${input.max} 之间的整数。`;
            } else if (model.valueAsNumber % heads.valueAsNumber !== 0) {
                invalidInput = heads;
                message = `${model.valueAsNumber} 不能被 ${heads.valueAsNumber} 整除。请调整模型宽度或头数。`;
            }

            for (const input of Object.values(inputs)) {
                if (input === invalidInput) {
                    input.setAttribute("aria-invalid", "true");
                } else {
                    input.removeAttribute("aria-invalid");
                }
            }

            error.hidden = !message;
            error.textContent = message;
            results.hidden = Boolean(message);
            if (message) return;

            const values = {
                tokens: tokens.valueAsNumber,
                model: model.valueAsNumber,
                heads: heads.valueAsNumber,
                headWidth: model.valueAsNumber / heads.valueAsNumber,
            };
            for (const cell of cells) {
                cell.textContent = String(values[cell.dataset.value]);
            }
        };

        form.oninput = update;
        form.onreset = () => requestAnimationFrame(update);
        form.onsubmit = (event) => event.preventDefault();
        fieldset.disabled = false;
        update();
    }
}

if (!customElements.get("transformer-dimensions")) {
    customElements.define("transformer-dimensions", TransformerDimensions);
}
