import readCurrentControlAttrs from "./readCurrentControlAttrs.js";
import readToControlAttrs from "./readToControlAttrs.js";
import filterMatchingValues from "./filterMatchingValues.js";
import mountDataListToDom from "./mountDataListToDom.js";

const updateDynamicDataList = ({ currentInput, inClosestControl, inOptions }) => {
    const currentInputValue = currentInput.value;

    const { currentControlColumnName, evalToControlName } = readCurrentControlAttrs(currentInput);

    const { closestTd, toControlDataListSourceTableName,
        toControlDataListSourceColumnName, evaltocontrol } = readToControlAttrs({
            evalToControlName, inClosestControl
        });

    const { filterBatches } = filterMatchingValues({
        currentInputValue, currentControlColumnName,
        toControlDataListSourceTableName, toControlDataListSourceColumnName,
        inGetDataList: inOptions?.inDataStore?.getDataList
    });

    const dataListId = mountDataListToDom({
        evalToControlName, inClosestControl, filterBatches, closestTd
    });

    evaltocontrol.setAttribute("list", dataListId);
};

export default updateDynamicDataList;