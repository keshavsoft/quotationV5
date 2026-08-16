import { buildTable } from "./modal/buildTable.js";
import { createModal } from "./modal/createModal.js";

export const addClick = ({ button, value }) => {
    button.addEventListener("click", (e) => {
        const tableNode = buildTable(value);
        createModal(tableNode, `Entries (${value.length})`);
    });
};
