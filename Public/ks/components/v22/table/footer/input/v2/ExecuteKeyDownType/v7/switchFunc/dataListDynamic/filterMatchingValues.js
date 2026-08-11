const filterMatchingValues = ({ currentInputValue, currentControlColumnName,
    toControlDataListSourceTableName, toControlDataListSourceColumnName,
    inGetDataList }) => {

    const toControlDataList = inGetDataList(toControlDataListSourceTableName);

    const filterRows = toControlDataList.filter(element => {
        return element[currentControlColumnName] === currentInputValue;
    });

    const filterBatches = filterRows.map(element => {
        return element[toControlDataListSourceColumnName];
    });

    return { filterBatches };
};

export default filterMatchingValues;
