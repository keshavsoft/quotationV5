import collectFieldsFromCells from "./collectFieldsFromCells.js";

const extractRowData = ({ closestTr }) => {
    const tds = closestTr.querySelectorAll("td");

    // PK is always stored as an integer — del/update handlers rely on strict comparison.
    let updatedItem = {};

    collectFieldsFromCells({ tds, updatedItem });

    updatedItem = {
        ...updatedItem,
        pk: parseInt(closestTr.dataset.pk)
    };

    return updatedItem;
};

export default extractRowData;
