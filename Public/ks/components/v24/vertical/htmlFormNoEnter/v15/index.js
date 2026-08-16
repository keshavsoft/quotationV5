import renderForm from "./render/start.js";

import {
    defaultOptionsSingleLine, defaultOptionsLabelAbove,
    defaultOptionsTwoLines, defaultOptionsInputInline,
    defaultOptionsInputsStacked
} from "./defaultOptions.js";

const layouts = {
    singleLine: defaultOptionsSingleLine,
    twoLines: defaultOptionsTwoLines,
    inputsInline: defaultOptionsInputInline,
    inputInline: defaultOptionsInputInline,
    inputsStacked: defaultOptionsInputsStacked,
    labelAbove: defaultOptionsLabelAbove
};

class KsHtmlFormNoEnter extends HTMLElement {
    static layouts = layouts;

    get layouts() {
        return this.constructor.layouts;
    }

    init(options) {
        // console.log("----------iiiiiiiiikkkkkkkkkkk---- : ", options);

        const layoutType = options?.layoutType || options?.inVerticalOptions?.layoutType;
        const layoutPreset = layouts[layoutType] || layouts.inputsInline;
        // debugger
        this.options = {
            ...layoutPreset,
            ...options,
            uiClasses: layoutPreset.uiClasses
        };
        this.render();
    }

    connectedCallback() {
        if (this.options && !this.dataset.rendered) {
            this.render();
        }
    }

    render() {
        this.dataset.rendered = "true";
        this.innerHTML = "";

        renderForm({
            element: this,
            options: this.options
        });
    }
}

if (!customElements.get("ks-html-form-no-enter")) {
    customElements.define("ks-html-form-no-enter", KsHtmlFormNoEnter);
}

window.ks = window.ks || {};
window.ks.components = window.ks.components || {};
window.ks.components.htmlFormNoEnter = KsHtmlFormNoEnter;
window.ks.components.htmlFormNoEnter.layouts = layouts;

window.ks.components.htmlFormNoEnter.version = "v15";

export default KsHtmlFormNoEnter;
export { KsHtmlFormNoEnter, layouts };
