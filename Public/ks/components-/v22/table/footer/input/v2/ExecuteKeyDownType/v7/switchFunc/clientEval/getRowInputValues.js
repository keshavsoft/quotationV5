/**
 * Extracts and maps all input values from the target table row.
 *
 * @param {HTMLTableRowElement} rowElement - Target table row
 * @returns {Object} Key-value pairs of input names and values
 */
const getRowInputValues = (rowElement) => {
    const allInputs = rowElement.querySelectorAll("input");
    return Object.fromEntries(
        [...allInputs].map(input => [input.name, Number(input.value) || 0])
    );
};

export default getRowInputValues;
