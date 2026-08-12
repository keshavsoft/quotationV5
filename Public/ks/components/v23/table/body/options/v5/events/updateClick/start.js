import extractRowData from "./extractRowData/index.js";
import revertRowToStaticText from "./revertRowToStaticText.js";
import toggleButtons from "./toggleButtons.js";

/**
 * Orchestration story — what happens the moment "Update" is clicked:
 *
 *  Click ──► startFunc
 *              │
 *              ├─ 1. Locate the DOM anchor points:
 *              │       • updateBtn   – the button that was clicked
 *              │       • actionsCell – its parent <td> that holds all row buttons
 *              │       • closestTr   – the full <tr> being saved
 *              │
 *              ├─ 2. extractRowData({ closestTr })
 *              │       Walks every data cell, reads each <input>'s name & value,
 *              │       and returns a flat { pk, field1, field2, … } object.
 *              │
 *              ├─ 3. options.onUpdateFunc({ updatedItem })   [if provided]
 *              │       Hands the collected data off to the consumer —
 *              │       typically an API call or local state update.
 *              │
 *              ├─ 4. revertRowToStaticText({ closestTr })
 *              │       Replaces every <input> back to a plain text node
 *              │       showing the freshly saved value.
 *              │
 *              └─ 5. toggleButtons({ actionsCell })
 *                      Hides Update/Cancel, reveals Edit/Delete —
 *                      the row returns to its default view-mode appearance.
 *
 * @param {Event}  event   - The click event from the Update button.
 * @param {Object} options - Component configuration, including onUpdateFunc.
 */
const startFunc = ({ event, options }) => {
    const updateBtn = event.currentTarget;
    const actionsCell = updateBtn.parentElement;
    const closestTr = updateBtn.closest("tr");

    if (!closestTr || !actionsCell) return;

    // 1. Gather values from inputs in row cells to construct an object
    const updatedItem = extractRowData({ closestTr, options });
    // debugger;
    if (options.onUpdateFunc) {
        options.onUpdateFunc({ updatedItem });
    };

    // 2. Revert cells to static text displaying the new values
    revertRowToStaticText({ closestTr });

    // 3. Toggle button visibilities back to default
    toggleButtons({ actionsCell });
};

export default startFunc;
