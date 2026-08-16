import { TableBuilder } from "./modal/TableBuilder.js";
import { ModalBuilder } from "./modal/ModalBuilder.js";

export const addClick = ({ button, value }) => {
    button.addEventListener("click", (e) => {
        const tableBuilder = new TableBuilder(value);
        const tableNode = tableBuilder.build();
        
        const modal = new ModalBuilder(tableNode, `Entries (${value.length})`);
        modal.show();
    });
};
