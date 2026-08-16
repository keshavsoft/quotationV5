export const applyStylesToParentCell = ({ closestTd, width, rightAlign }) => {
    if (closestTd) {
        closestTd.style.width = width;

        if (rightAlign) {
            closestTd.classList.add("text-right");
        };
    };
};
