import { forSearchValue } from "./forSearchValue.js";
import { forNumberSeperator } from "./forNumberSeperator.js";
import { forArray } from "./forArray.js";

export const buildHtmlContent = ({ value, searchValue, showThousandsSeperator }) => {
    if (searchValue !== undefined) {
        return forSearchValue({ text: value, searchValue });
    }

    if (showThousandsSeperator) {
        return forNumberSeperator({ value });
    }

    const ifValueIsArray = Array.isArray(value);
    if (ifValueIsArray) {
        return forArray({ value });
    }

    return value;
};
