export const createAnchor = ({
    inHtmlId = "", inHref = "#", inClass = "", inTableName = "",
    inSvgName = "", inSvgDivClass = "", inClassName, inTextToShow,
    inDropdownItems = [], inDropdownType = ""
}) => {
    const isDropdown = Array.isArray(inDropdownItems) && inDropdownItems.length > 0;
    
    let a;
    if (isDropdown) {
        if (inDropdownType === "inline") {
            a = document.createElement("ks-dropdown-inline");
        } else if (inDropdownType === "absolute") {
            a = document.createElement("ks-dropdown-absolute");
        } else {
            a = document.createElement("ks-dropdown-responsive");
        }
    } else {
        a = document.createElement("ks-menu-item");
    }

    a.setAttribute(
        "ks-id",
        inHtmlId || ""
    );

    a.setAttribute(
        "ks-href",
        inHref || "#"
    );

    a.setAttribute(
        "ks-class",
        inClass || ""
    );

    a.setAttribute("ks-svgName", inSvgName || "");
    a.setAttribute("ks-svgDivClass", inSvgDivClass || "");

    a.setAttribute("ks-className", inClassName || "");
    a.setAttribute("ks-textToShow", inTextToShow || "");

    if (isDropdown) {
        inDropdownItems.forEach(child => {
            const childA = document.createElement("a");
            childA.href = child.href || "#";
            childA.textContent = child.text || "";
            if (child.id) childA.id = child.id;
            a.appendChild(childA);
        });
    }

    return a;
};