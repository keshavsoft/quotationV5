import findAncestorKsControl from "./findAncestorKsControl.js";

const readToControlAttrs = ({ evalToControlName, inClosestControl }) => {
    const evaltocontrol = inClosestControl.querySelector(`[name="${evalToControlName}"]`);
    const toControlClosestKsControl = findAncestorKsControl(evaltocontrol);

    const closestTd = evaltocontrol.closest("td");
    const toControlDataListSource = toControlClosestKsControl.getAttribute("ksdatalistsource");
    const toControlDataListSourceSplit = toControlDataListSource.split(".");
    const toControlDataListSourceTableName = toControlDataListSourceSplit[0];
    const toControlDataListSourceColumnName = toControlDataListSourceSplit[1];

    return {
        closestTd, toControlDataListSourceTableName,
        toControlDataListSourceColumnName, evaltocontrol
    };
};

export default readToControlAttrs;
