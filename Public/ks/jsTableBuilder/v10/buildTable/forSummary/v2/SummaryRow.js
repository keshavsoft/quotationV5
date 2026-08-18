import { createTrElement } from "./SummaryRow/1-createTrElement.js";
import { calculateSummaryValue } from "./SummaryRow/2-calculateSummaryValue.js";
import { buildTdElement } from "./SummaryRow/3-buildTdElement.js";
import { buildCellContent } from "./SummaryRow/4-buildCellContent.js";

const buildSummaryRow = ({ inData, inColumns, inClasses = {}, inFootOptions = {} }) => {
    const localData = inData;
    const localColumns = inColumns;
    const localClasses = inClasses;
    const localFootOptions = inFootOptions;

    const trElement = createTrElement({ inClasses: localClasses });

    localColumns.forEach(col => {
        const tdElement = buildTdElement({ 
            inClasses: localClasses, 
            inCol: col 
        });

        const summaryValue = calculateSummaryValue({ 
            inData: localData, 
            inCol: col 
        });

        const cellContent = buildCellContent({ 
            inFootOptions: localFootOptions, 
            inSummaryValue: summaryValue 
        });

        tdElement.appendChild(cellContent);
        trElement.appendChild(tdElement);
    });

    return trElement;
};

export { buildSummaryRow };