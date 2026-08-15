import { buildFullUI } from "./compose/buildFullUI.js";

import searchFuncs from "../SearchFuncs/V6/index.js";
import setFocus from "../SetFocus/V4/index.js";
import tableCodeOnly from "./tableCodeOnly.js";
import buildDataLists from "../BuildDataLists/V5/addToDom.js";

const startFunc = ({
    containerEl,
    dataStore,
    dom,
    options,
    uiClasses,
    inDefaults,
    inConfig, callbacks
}) => {
    const showSerial = options.table.showSerial;
    const serialWidth = options.table.serialWidth;
    const showDataList = options.table.showDataList;

    const showSearch = options.firstRow.showSearch;

    const showActions = options?.table?.showActions;
    const showBody = options?.table?.showBody;

    const inShowShow = options?.table?.body?.showShow;
    const inShowEdit = options?.table?.body?.showEdit;
    const inShowDelete = options?.table?.body?.showDelete;
    const inDeleteType = options?.table?.body?.deleteType;
    const inDeleteIconSize = options?.table?.body?.deleteIconSize;
    const firstRow = options?.firstRow;
    const clearOld = options?.clearOld;

    const dataListColumns = dataStore.getDataListColumns();

    debugger;
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

    tableCodeOnly({
        containerEl,
        dataStore,
        dom,
        options,
        uiClasses,
        inDefaults, inShowBody: showBody,
        inConfig, callbacks
    });

    if (showDataList) {
        buildDataLists({
            inContainerEl: containerEl,
            inDataStore: dataStore,
            inDom: dom,
            inData: inDefaults?.data, inShowLog: true,
            inDataListColumns: dataListColumns
        });
    };

    if (showSearch) {
        searchFuncs({
            inContainerEl: containerEl,
            inFirstRow: options?.firstRow
        });
    };

    setFocus({ inContainerEl: containerEl });
};

export default startFunc;