import applyCellOptions from "../../../utils/style/applyCellOptions.js";
import { calculateSummaryValue } from "./2-calculateSummaryValue.js";
import { buildCellContent } from "./4-buildCellContent.js";

export function buildTdElement({ inColumn, inData, inClasses, inFootOptions }) {
    const localColumn = inColumn;
    const localData = inData;
    const localClasses = inClasses;
    const localFootOptions = inFootOptions;

    const tdElement = document.createElement("td");
    if (localClasses.td) tdElement.className = localClasses.td;

    // Apply cell options (width, align) from column config
    if (localColumn.options) {
        applyCellOptions(tdElement, localColumn.options);
    }

    const summaryValue = calculateSummaryValue({
        inData: localData,
        inColumnOptions: localColumn.options,
        inDataKey: localColumn.dataKey
    });

    const cellContent = buildCellContent({
        inSummaryValue: summaryValue,
        inFootOptions: localFootOptions
    });

    tdElement.appendChild(cellContent);

    return tdElement;
}
