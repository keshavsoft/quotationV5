import { highlight } from "../highlight.js";

export const forSearchValue = ({ text, searchValue }) => {
    return highlight({
        text,
        searchValue
    });
};
