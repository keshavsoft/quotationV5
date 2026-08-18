import { createTrElement } from "./SummaryRow/1-createTrElement.js";
import { buildTdElement } from "./SummaryRow/3-buildTdElement.js";

function buildSummaryRow({ inData, inColumns, inClasses = {}, inFootOptions = {} }) {
    const localData = inData;
    const localColumns = inColumns;
    const localClasses = inClasses;
    const localFootOptions = inFootOptions;

    const trElement = createTrElement({ inClasses: localClasses });

    localColumns.forEach(col => {
        const tdElement = buildTdElement({
            inColumn: col,
            inData: localData,
            inClasses: localClasses,
            inFootOptions: localFootOptions
        });
        
        trElement.appendChild(tdElement);
    });

    return trElement;
}

export { buildSummaryRow };
