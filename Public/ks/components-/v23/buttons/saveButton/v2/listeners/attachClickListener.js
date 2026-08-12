import checkFooterInputsNonEmpty from "../validation/checkFooterInputsNonEmpty.js";
import collectFieldsFromCells from "./collectFieldsFromCells.js";

const extractFooterData = (currentTarget) => {
    const closestFooter = currentTarget.closest("tfoot");
    if (!closestFooter) return {};

    const tds = closestFooter.querySelectorAll("td");
    const data = {};

    collectFieldsFromCells({ tds, updatedItem: data });

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
