import checkFooterInputsNonEmpty from "../validation/checkFooterInputsNonEmpty.js";
import extractInputFromCell from "./extractInputFromCell.js";

/**
 * Helper to query and extract all input names and values from the closest footer element.
 */
const extractFooterData = (currentTarget) => {
    const closestFooter = currentTarget.closest("tfoot");
    if (!closestFooter) return {};

    const tds = closestFooter.querySelectorAll("td");
    const data = {};

    tds.forEach((td) => {
        const extractedData = extractInputFromCell(td);
        if (extractedData) {
            data[extractedData.name] = extractedData.value;
        };
    });

    return data;
};

/**
 * Helper to query and extract all input names and values from the closest footer element.
 */
const extractFooterData1 = (currentTarget) => {
    const closestFooter = currentTarget.closest("tfoot");
    if (!closestFooter) return {};

    const inputs = closestFooter.querySelectorAll("input");
    const data = {};

    inputs.forEach((input) => {
        data[input.name] = input.value;
    });

    return data;
};

const attachClickListener = ({ htmlElement, inOnSaveFunc }) => {
    htmlElement.onclick = (e) => {
        if (e && typeof e.preventDefault === "function") {
            e.preventDefault();
        }

        const currentTarget = e.currentTarget;
        const tableFooter = currentTarget.closest("tfoot");

        const localIsFooterInputsNonEmpty = checkFooterInputsNonEmpty({ inTableFooter: tableFooter });

        const data = extractFooterData(currentTarget);

        inOnSaveFunc({
            dataFromDom: data,
            inCurrentTarget: currentTarget,
            canSave: localIsFooterInputsNonEmpty
        });
    };
};

export { attachClickListener };
