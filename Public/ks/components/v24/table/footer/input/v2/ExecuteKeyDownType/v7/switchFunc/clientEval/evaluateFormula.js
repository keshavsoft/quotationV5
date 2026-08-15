/**
 * Dynamically evaluates a mathematical formula using the provided row values.
 *
 * @param {Object} params
 * @param {string} params.formula - JavaScript-compatible formula string (e.g. "qty * rate")
 * @param {Object} params.values - Key-value map of input names to numbers
 * @returns {number} The calculated value
 */
const evaluateFormula = ({ formula, values }) => {
    const fn = new Function(
        ...Object.keys(values),
        `return ${formula};`
    );

    return fn(...Object.values(values));
};

export default evaluateFormula;
