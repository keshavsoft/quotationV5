import { buildFullUI } from "./compose/buildFullUI.js";

import searchFuncs from "../SearchFuncs/V5/index.js";
import setFocus from "../SetFocus/V4/index.js";
import buildDataLists from "../BuildDataLists/V5/addToDom.js";

import tableOnly from "./tableOnly.js";

const startFunc = ({
    containerEl,
    dataStore,
    dom,
    services,
    options,
    endPoints,
    columnsConfig,
    uiClasses,
    callbacks,
    inConfig
}) => {

    const data = dataStore.getData();
    const showSerial = options.table.showSerial;
    const serialWidth = options.table.serialWidth;
    const showDataList = options.table.showDataList;

    const dataListColumns = dataStore.getDataListColumns();

    const showSearch = options.firstRow.showSearch;

    const showActions = options?.table?.showActions;

    const inShowShow = options?.table?.body?.showShow;
    const inShowEdit = options?.table?.body?.showEdit;
    const inShowDelete = options?.table?.body?.showDelete;
    const inDeleteType = options?.table?.body?.deleteType;
    const inDeleteIconSize = options?.table?.body?.deleteIconSize;
    // console.log("hhhhhhhhhhhhhh :");
    const firstRow = options?.firstRow;
    const clearOld = options?.clearOld;
    const showBody = options?.table?.showBody;

    // debugger
    buildFullUI({
        containerEl: containerEl, dom,
        inTableName: inConfig.tableName,
        inIsShowHeaderRow: showSearch,
        inShowSerial: showSerial,
        inSerialWidth: serialWidth,
        inShowActions: showActions, inShowShow,
        inShowEdit, inShowDelete, inDeleteType, inDeleteIconSize,
        inFirstRow: options?.firstRow, dataStore,
        inConfig, inShowBody: showBody, clearOld
    });

    tableOnly({
        containerEl,
        dataStore,
        dom,
        services,
        options,
        endPoints,
        columnsConfig,
        uiClasses,
        callbacks,
        inConfig, inShowBody: showBody,
    });

    if (showDataList) {
        buildDataLists({
            inContainerEl: containerEl,
            inDataStore: dataStore,
            inDom: dom,
            inData: data,
            inDataListColumns: dataListColumns
        });
    };

    if (showSearch) {
        // for search vertical
        searchFuncs({ inContainerEl: containerEl });
    };

    setFocus({ inContainerEl: containerEl });
};

export default startFunc;