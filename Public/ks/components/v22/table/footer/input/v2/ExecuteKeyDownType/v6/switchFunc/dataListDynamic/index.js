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

const executeKeyDownType = ({ currentInput, inClosestControl, inOptions }) => {
    const currentInputValue = currentInput.value;
    const closestKsControl = getClosestKsControl(currentInput);
    const evaltocontrolName = closestKsControl.getAttribute("evalToControl");
    const ksdatalistsource = closestKsControl.getAttribute("ksdatalistsource");
    const currentControlSplit = ksdatalistsource.split(".");
    const currentControlColumnName = currentControlSplit[1];

    const evaltocontrol = document.querySelector(`[name="${evaltocontrolName}"]`);
    const toControlClosestKsControl = getClosestKsControl(evaltocontrol);

    const closestTd = evaltocontrol.closest("td");
    const toControlDataListSource = toControlClosestKsControl.getAttribute("ksdatalistsource");
    const toControlDataListSourceSplit = toControlDataListSource.split(".");
    const toControlDataListSourceTableName = toControlDataListSourceSplit[0];
    const toControlDataListSourceColumnName = toControlDataListSourceSplit[1];

    const getDataList = inOptions?.inDataStore?.getDataList;

    // const k2 = getDataList("StockItems");
    const toControlDataList = getDataList(toControlDataListSourceTableName);

    const filterRows = toControlDataList.filter(element => {
        return element[currentControlColumnName] === currentInputValue;
    });

    const filterBatches = filterRows.map(element => {
        return element[toControlDataListSourceColumnName];
    });

    console.log("k3 -----------:", filterBatches, currentInputValue);

    // console.log("k3 -----------:", toControlDataListSourceTableName, toControlDataListSourceColumnName, currentControlColumnName, toControlDataList);

    const dataList = createDataList({
        id: "StockItemList",
        values: filterBatches
    });

    closestTd.appendChild(dataList);

    evaltocontrol.setAttribute("list", "StockItemList");

    // const controlAttr = 

};

export default executeKeyDownType;