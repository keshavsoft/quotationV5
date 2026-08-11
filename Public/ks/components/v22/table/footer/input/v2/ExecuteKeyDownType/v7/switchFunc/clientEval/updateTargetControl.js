/**
 * Updates the value of the target input in the table row.
 *
 * @param {HTMLTableRowElement} rowElement - Target table row
 * @param {string} controlName - Name of the target input element
 * @param {number} value - Calculated number to show
 * @returns {boolean} Whether the update succeeded
 */
const updateTargetControl = (rowElement, controlName, value) => {
    const targetControl = rowElement.querySelector(`input[name="${controlName}"]`);
    if (!targetControl) return false;

    targetControl.value = value.toFixed(2);
    return true;
};

export default updateTargetControl;
