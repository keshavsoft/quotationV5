/**
 * Extracts input values inside row cells into a data object.
 *
 * @param {HTMLTableRowElement} closestTr - The target row element.
 * @param {Object} options - Component options containing initial row item.
 * @returns {Object} Gathered key-value pairs representing the edited row data.
 */
const extractRowData = ({ closestTr }) => {
    const tds = closestTr.querySelectorAll("td");
    // debugger;
    //here intentionally changed pk to integer, as del and update is written for integer only for pk comparision
    const updatedItem = { pk: parseInt(closestTr.dataset.pk) };

    tds.forEach((td, i) => {
        if (i === tds.length - 1) return;

        const input = td.querySelector("input");
        if (input && input.name) {
            // console.log("iiiiiiiii--------- : ", input.name);

            updatedItem[input.name] = input.value;
        }
    });
    // console.log("uuuuuuuuuuuu--------- : ", updatedItem);

    return updatedItem;
};

export default extractRowData;
