import evaluateFormula from "./evaluateFormula.js";
import getClosestCustomElement from "./getClosestCustomElement.js";
import getRowInputValues from "./getRowInputValues.js";
import updateTargetControl from "./updateTargetControl.js";
import showCalcMessage from "../../showCalcMessage.js";

/**
 * Orchestrates the formula calculation and updates the target cell in the footer row.
 */
const startFunc = ({ currentInput, inClosestControl }) => {
    const closestTr = inClosestControl;

    // 1. Get properties from the custom element wrapper
    const customElement = getClosestCustomElement(currentInput);
    if (!customElement) return;

    const formula = customElement.getAttribute("evalformula");
    const evalToControl = customElement.getAttribute("evalToControl");

    // 2. Read values from inputs inside the row
    const values = getRowInputValues(closestTr);

    // 3. Calculate formula
    const calculatedValue = evaluateFormula({ formula, values });

    // 4. Update the target element
    const isUpdated = updateTargetControl(closestTr, evalToControl, calculatedValue);
    if (!isUpdated) return;

    // 5. Display calculation feedback message
    showCalcMessage({
        input: currentInput,
        message: `Amount change : ${calculatedValue}`
    });
};

export default startFunc;
