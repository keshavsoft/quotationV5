import KsInput from "../../../commonInputBuilder/inputCore/v4/index.js";

import createLabel from "./Label/createLabel.js";
import createWrapper from "./createWrapper.js";
import createCheckBox from "./createCheckBox.js";
import createButton from "./createButton.js";

class KsInputNoEnter extends KsInput {
    connectedCallback() {
        super.connectedCallback();
    }

    renderInput({ inInput }) {
        console.log("----------verticalConfig-- : ", this.verticalConfig);

        const inLabel = this.getAttribute("label");
        const inLabelClass = this.getAttribute("ksLabelClass");
        const inRowClass = this.getAttribute("ksRowClass");

        const wrapper = createWrapper({ inRowClass });
        const label = createLabel({ labelText: inLabel, inLabelClass });
        // const button = createButton();

        wrapper.append(label, inInput);

        if (this?.verticalConfig?.showCheckBox) {
            const button = createCheckBox({
                inTextToShow: this?.verticalConfig?.showCheckBox?.textToShow,
                inClassName: this?.verticalConfig?.showCheckBox?.className
            });

            wrapper.append(button);
        };

        if (this?.verticalConfig?.showButton) {
            const button = createButton({
                inTextToShow: this?.verticalConfig?.showButton?.textToShow,
                inClassName: this?.verticalConfig?.showButton?.className
            });

            wrapper.append(button);
        };

        this.replaceChildren(wrapper);
    }
};

if (!customElements.get("ks-input-no-enter")) {
    customElements.define("ks-input-no-enter", KsInputNoEnter);
};

window.ks = window.ks || {};
window.ks.components = window.ks.components || {};
window.ks.components.inputs = window.ks.components.inputs || {};
window.ks.components.inputs.noEnter = window.ks.components.inputs.noEnter || {};
window.ks.components.inputs.noEnter.version = "v3";

export default KsInputNoEnter;
