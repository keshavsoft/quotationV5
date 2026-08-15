import createDataListElement from "./createDataListElement.js";
import getUniqueTruthyValues from "./getUniqueTruthyValues.js";
import readDataListSource from "./readDataListSource.js";

const orchestrateDataLists = ({
    inContainerEl,
    inDataStore,
    inDom, inData,
    inDataListColumns, inShowLog = false
}) => {
    if (inShowLog) console.log("inDataListColumns : ", inDataListColumns);

    const dataListContainer = inDom.getDataListContainerClass(inContainerEl);

    if (!dataListContainer) return;

    dataListContainer.innerHTML = "";
    // debugger;
    inDataListColumns.forEach(columnConfig => {
        const sourceData = readDataListSource({
            columnConfig, inData,
            dataStore: inDataStore
        });

        // const values = getUniqueTruthyValues(sourceData);
        const datalist = createDataListElement({
            columnName: columnConfig.columnName,
            values: sourceData
        });

        dataListContainer.appendChild(datalist);
    });
};

export default orchestrateDataLists;
