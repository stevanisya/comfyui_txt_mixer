import { app } from "../../scripts/app.js";

app.registerExtension({
    name: "UnaCustom.TextMixer",
    async nodeCreated(node) {
        if (node.comfyClass !== "TextMixer") return;
        const countWidget = node.widgets?.find(w => w.name === "inputs_count");
        if (!countWidget) return;
        const updateInputs = () => {
            const count = countWidget.value;
            if (node.inputs) {
                for (let i = node.inputs.length - 1; i >= 0; i--) {
                    const inp = node.inputs[i];
                    if (inp.name.startsWith("txt_")) {
                        const num = parseInt(inp.name.split("_")[1]);
                        if (num > count) {
                            node.removeInput(i);
                        }
                    }
                }
            }
            for (let i = 1; i <= count; i++) {
                const name = `txt_${i}`;
                if (!node.inputs?.find(inp => inp.name === name)) {
                    node.addInput(name, "STRING");
                }
            }
            if (node.inputs) {
                node.inputs.sort((a, b) => {
                    const aIsTxt = a.name.startsWith("txt_");
                    const bIsTxt = b.name.startsWith("txt_");
                    if (!aIsTxt && !bIsTxt) return 0;
                    if (!aIsTxt) return -1;
                    if (!bIsTxt) return 1;
                    return parseInt(a.name.split("_")[1]) - parseInt(b.name.split("_")[1]);
                });
            }
            node.setSize(node.computeSize());
            app.graph.setDirtyCanvas(true);
        };
        const origCallback = countWidget.callback;
        countWidget.callback = (...args) => {
            origCallback?.(...args);
            updateInputs();
        };
        updateInputs();
        const origOnConfigure = node.onConfigure;
        node.onConfigure = function (config) {
            origOnConfigure?.apply(this, arguments);
            requestAnimationFrame(() => updateInputs());
        };
    },
});