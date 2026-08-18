import "../../../../webComponents/v2/KsTableCellContent.js";

const showLog = false;

export function buildCellContent({ inSummaryValue, inFootOptions }) {
    const localSummaryValue = inSummaryValue;
    const localFootOptions = inFootOptions;

    const cellContent = document.createElement("ks-table-cell-content");
    
    if (localFootOptions.inRowHeight) {
        cellContent.style.minHeight = localFootOptions.inRowHeight;
    }

    // Apply summary specific bold styling
    cellContent.style.fontWeight = "bold";

    if (localSummaryValue !== "") {
        cellContent.inputs = { cellValue: localSummaryValue };
    } else {
        cellContent.inputs = { cellValue: "" };
    }

    if (showLog) {
        console.log("cellContent", localSummaryValue, cellContent);
    }

    return cellContent;
}
