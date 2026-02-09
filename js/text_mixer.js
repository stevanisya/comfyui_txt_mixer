import { app } from "../../scripts/app.js";

app.registerExtension({
    name: "UnaCustom.TextMixer",
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name !== "TextMixer") return;

        const onConnectionsChange = nodeType.prototype.onConnectionsChange;
        nodeType.prototype.onConnectionsChange = function (type, slotIndex, isConnected, link_info, ioSlot) {
            onConnectionsChange?.apply(this, arguments);
            if (type !== LiteGraph.INPUT) return;
            if (this._updatingInputs) return;

            requestAnimationFrame(() => {
                if (this._updatingInputs) return;
                this._updatingInputs = true;

                // Remove unconnected txt_ inputs from end to start
                for (let i = this.inputs.length - 1; i >= 0; i--) {
                    if (this.inputs[i].name.startsWith("txt_") && !this.inputs[i].link) {
                        this.removeInput(i);
                    }
                }

                // Renumber remaining txt_ inputs sequentially
                let num = 1;
                for (let i = 0; i < this.inputs.length; i++) {
                    if (this.inputs[i].name.startsWith("txt_")) {
                        this.inputs[i].name = `txt_${num}`;
                        num++;
                    }
                }

                // Add one spare input at the end
                this.addInput(`txt_${num}`, "STRING", { shape: 7 });

                this.setSize(this.computeSize());
                app.graph.setDirtyCanvas(true);
                this._updatingInputs = false;
            });
        };
    },
});
