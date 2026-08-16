import { createButton } from "./createButton.js";
import { addClick } from "./addClick.js";

export const forArray = ({ value }) => {
    const button = createButton({ value });
    addClick({ button, value });
    return button;
};
