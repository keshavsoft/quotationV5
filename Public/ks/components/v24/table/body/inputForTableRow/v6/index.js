import { applyStylesToParentCell } from "./applyStylesToParentCell.js";
import { buildHtmlContent } from "./buildHtmlContent/index.js";

class KsTableBodyCell extends HTMLElement {
    connectedCallback() {
        const value = this.ksValue ?? "";
        const rightAlign = this.ksRightAlign;
        const width = this.ksWidth;
        const searchValue = this.ksSearchValue;
        const showThousandsSeperator = this.getAttribute("ks-showThousandsSeperator") ?? false;
        
        const closestTd = this.closest("td");

        applyStylesToParentCell({ closestTd, width, rightAlign });

        const content = buildHtmlContent({ value, searchValue, showThousandsSeperator });
        
        if (content instanceof HTMLElement) {
            this.innerHTML = "";
            this.appendChild(content);
        } else {
            this.innerHTML = content;
        }
    }
}

if (!customElements.get("ks-table-body-cell")) {
    customElements.define("ks-table-body-cell", KsTableBodyCell);
}

export default {};
