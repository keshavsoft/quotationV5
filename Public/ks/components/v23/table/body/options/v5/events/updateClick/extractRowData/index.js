import extractInputFromCell from "./extractInputFromCell.js";
/**
 * Story: When the user clicks "Update", the row is still in edit mode —
 * every data cell contains a live <input> element with the user's new value.
 * This module's job is to read that edited state and package it into a
 * plain object that the rest of the system can store or send to a server.
 *
 * Step 1 — Seed the object with the row's primary key (always an integer,
 *           because delete/update handlers compare PKs with strict equality).
 * Step 2 — Walk every data cell (skip the last "options" cell).
 * Step 3 — For each cell that contains a named <input>, capture its current
 *           value under the input's `name` attribute as the key.
 * Result — A flat { pk, field1, field2, … } object ready to hand off to
 *           `options.onUpdateFunc`.
 *
 * @param {HTMLTableRowElement} closestTr - The table row currently being saved.
 * @returns {Object} Flat key-value map of the edited row data, including pk.
 */

/**
 * Walks every data cell in the row (skipping the last options cell),
 * calls extractInputFromCell on each, and merges the results into `updatedItem`.
 *
 * @param {NodeList}  tds         - All <td> elements in the row.
 * @param {Object}    updatedItem - The accumulator object to populate in place.
 */
const collectFieldsFromCells = ({ tds, updatedItem }) => {
    tds.forEach((td, i) => {
        if (i === tds.length - 1) return; // skip the options/actions cell

        const field = extractInputFromCell(td);
        if (field) {
            updatedItem[field.name] = field.value;
        }
    });
};

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
