import { highlight } from "./highlight.js";

export const buildHtmlContent = ({ value, searchValue, showThousandsSeperator }) => {
    if (searchValue !== undefined) {
        return highlight({
            text: value,
            searchValue
        });
    }

    if (showThousandsSeperator) {
        return Number(value).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    const ifValueIsArray = Array.isArray(value);
    if (ifValueIsArray) {
        return `<button type="button" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded text-xs shadow-sm">
            View (${value.length})
        </button>`;
    }

    return value;
};
