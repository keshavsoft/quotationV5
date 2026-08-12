import buildDataListElement from "./buildDataListElement.js";

const mountDataListToDom = ({ evalToControlName, inClosestControl, filterBatches, closestTd }) => {
    const dataListId = `${evalToControlName}DataList`;

    const existingDataList = inClosestControl.querySelector(`#${dataListId}`);

    if (existingDataList) {
        existingDataList.remove();
    };

    const dataList = buildDataListElement({
        id: dataListId,
        values: filterBatches
    });

    closestTd.appendChild(dataList);

    return dataListId;
};

export default mountDataListToDom;
