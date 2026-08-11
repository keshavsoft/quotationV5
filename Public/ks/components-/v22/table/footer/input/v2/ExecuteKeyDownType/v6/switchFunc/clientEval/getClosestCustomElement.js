/**
 * Walks up the DOM tree from an element to find the closest custom component parent.
 *
 * @param {HTMLElement} element - Starting DOM element
 * @returns {HTMLElement|null} Custom component element or null
 */
const getClosestCustomElement = (element) => {
    let current = element.parentElement;
    while (current) {
        if (current.tagName && current.tagName.includes("-")) {
            return current;
        }
        current = current.parentElement;
    }
    return null;
};

export default getClosestCustomElement;
