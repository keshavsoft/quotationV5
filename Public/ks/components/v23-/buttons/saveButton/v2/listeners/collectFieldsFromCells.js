import extractInputFromCell from "./extractInputFromCell.js";
/**
 * Walks every data cell in the row (skipping the last options cell),
 * calls extractInputFromCell on each, and merges the results into `updatedItem`.
 *
 * @param {NodeList}  tds         - All <td> elements in the row.
 * @param {Object}    updatedItem - The accumulator object to populate in place.
 */
const startFunc = ({ tds, updatedItem }) => {
    tds.forEach((td, i) => {
        if (i === tds.length - 1) return; // skip the options/actions cell

        const field = extractInputFromCell(td);
        if (field) {
            updatedItem[field.name] = field.value;
        }
    });
};

export default startFunc;