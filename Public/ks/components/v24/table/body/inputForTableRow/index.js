import { highlight } from "./highlight.js";

class KsTableBodyCell extends HTMLElement {
    connectedCallback() {
        const value = this.ksValue ?? "";
        const rightAlign = this.ksRightAlign;
        const width = this.ksWidth;
        const searchValue = this.ksSearchValue;
        const showThousandsSeperator = this.getAttribute("ks-showThousandsSeperator") ?? false;
        // console.log("comp---------- : ", showThousandsSeperator);

        const closestTd = this.closest("td");

        if (closestTd) {
            closestTd.style.width = width;

            if (rightAlign) {
                closestTd.classList.add("text-right");
            };
        };
        // console.log("searchValue : ", searchValue);
        if (searchValue === undefined) {
            if (showThousandsSeperator) {
                this.innerHTML = Number(value).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            } else {
                const ifValueIsArray = Array.isArray(value);
                if (ifValueIsArray) {
                    this.innerHTML = `<button type="button" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded text-xs shadow-sm">
                        View (${value.length})
                    </button>`;
                } else {
                    this.innerHTML = value;
                };
            };
        } else {
            this.innerHTML = highlight({
                text: value,
                searchValue
            });
        };

    }
}

if (!customElements.get("ks-table-body-cell")) {
    customElements.define("ks-table-body-cell", KsTableBodyCell);
}

export default {};
