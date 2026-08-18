import { createLi } from "./createLi.js";
import { createAnchor } from "./createAnchor.js";

export const buildMenuItem = ({
    inTextToShow,
    inHtmlId,
    inIconPaths,
    inHref,
    onClick,
    inTableName,
    inClasses,
    inSvgName,
    inConfigUiClasses,
    inDropdownItems,
    inDropdownType
}) => {
    const li = createLi(inClasses.liClass);

    const a = createAnchor({
        inHtmlId,
        inHref,
        inClass: inClasses?.aClass,
        inTableName,
        inSvgName,
        inSvgDivClass: inClasses.svgClass,
        inTextToShow: inTextToShow,
        inClassName: inClasses.spanClass,
        inDropdownItems,
        inDropdownType
    });

    li.appendChild(a);

    return li;
};