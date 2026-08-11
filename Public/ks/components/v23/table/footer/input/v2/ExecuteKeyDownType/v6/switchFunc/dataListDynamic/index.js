const createDataList = ({ id, values }) => {
    const datalist = document.createElement("datalist");

    datalist.id = id;

    values.forEach(value => {
        const option = document.createElement("option");
        option.value = value;

        datalist.appendChild(option);
    });

    return datalist;
};

const getClosestKsControl = (element) => {
    while (element && element !== document) {
        if (element.tagName?.toLowerCase().startsWith("ks-")) {
            return element;
        }

        element = element.parentElement;
    }

    return null;
};

const getCurrentControlAttr = (currentInput) => {
    const closestKsControl = getClosestKsControl(currentInput);
    const evalToControlName = closestKsControl.getAttribute("evalToControl");
    const ksdatalistsource = closestKsControl.getAttribute("ksdatalistsource");
    const currentControlSplit = ksdatalistsource.split(".");
    const currentControlColumnName = currentControlSplit[1];

    return { currentControlColumnName, evalToControlName };
};

const getToControlAttr = ({ evalToControlName, inClosestControl }) => {

    const evaltocontrol = inClosestControl.querySelector(`[name="${evalToControlName}"]`);
    const toControlClosestKsControl = getClosestKsControl(evaltocontrol);

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

const getFilteredBatches = ({ currentInputValue, currentControlColumnName,
    toControlDataListSourceTableName, toControlDataListSourceColumnName,
    inGetDataList }) => {

    const getDataList = inGetDataList;

    const toControlDataList = getDataList(toControlDataListSourceTableName);

    const filterRows = toControlDataList.filter(element => {
        return element[currentControlColumnName] === currentInputValue;
    });

    const filterBatches = filterRows.map(element => {
        return element[toControlDataListSourceColumnName];
    });

    return { filterBatches };
};

const insertDataListToDom = ({ evalToControlName, inClosestControl, filterBatches, closestTd }) => {
    const dataListId = `${evalToControlName}DataList`;

    const existingDataList = inClosestControl.querySelector(`#${dataListId}`);

    if (existingDataList) {
        existingDataList.remove();
    };

    const dataList = createDataList({
        id: dataListId,
        values: filterBatches
    });

    closestTd.appendChild(dataList);

    return dataListId;
};

const executeKeyDownType = ({ currentInput, inClosestControl, inOptions }) => {
    const currentInputValue = currentInput.value;
    // debugger
    const { currentControlColumnName, evalToControlName } = getCurrentControlAttr(currentInput);

    const { closestTd, toControlDataListSourceTableName,
        toControlDataListSourceColumnName, evaltocontrol } = getToControlAttr({
            evalToControlName, inClosestControl
        });
    // debugger
    const { filterBatches } = getFilteredBatches({
        currentInputValue, currentControlColumnName,
        toControlDataListSourceTableName, toControlDataListSourceColumnName,
        inGetDataList: inOptions?.inDataStore?.getDataList
    });

    const dataListId = insertDataListToDom({
        evalToControlName, inClosestControl, filterBatches, closestTd
    });

    evaltocontrol.setAttribute("list", dataListId);
};

const executeKeyDownType1 = ({ currentInput, inClosestControl, inOptions }) => {
    const currentInputValue = currentInput.value;
    debugger
    const { currentControlColumnName, evalToControlName } = getCurrentControlAttr(currentInput);

    const { closestTd, toControlDataListSourceTableName,
        toControlDataListSourceColumnName, evaltocontrol } = getToControlAttr({
            evalToControlName, inClosestControl
        });

    const getDataList = inOptions?.inDataStore?.getDataList;

    // const k2 = getDataList("StockItems");
    const toControlDataList = getDataList(toControlDataListSourceTableName);

    const filterRows = toControlDataList.filter(element => {
        return element[currentControlColumnName] === currentInputValue;
    });

    const filterBatches = filterRows.map(element => {
        return element[toControlDataListSourceColumnName];
    });

    const dataList = createDataList({
        id: "StockItemList",
        values: filterBatches
    });

    closestTd.appendChild(dataList);

    evaltocontrol.setAttribute("list", "StockItemList");

    // const controlAttr = 

};

export default executeKeyDownType;