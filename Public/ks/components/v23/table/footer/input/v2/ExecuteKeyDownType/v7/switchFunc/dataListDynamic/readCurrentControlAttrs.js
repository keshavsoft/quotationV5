import findAncestorKsControl from "./findAncestorKsControl.js";

const readCurrentControlAttrs = (currentInput) => {
    const closestKsControl = findAncestorKsControl(currentInput);
    const evalToControlName = closestKsControl.getAttribute("evalToControl");
    const ksdatalistsource = closestKsControl.getAttribute("ksdatalistsource");
    const currentControlSplit = ksdatalistsource.split(".");
    const currentControlColumnName = currentControlSplit[1];

    return { currentControlColumnName, evalToControlName };
};

export default readCurrentControlAttrs;
