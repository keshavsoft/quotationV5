import { buildFullUI } from "./compose/buildFullUI.js";

import searchFuncs from "../SearchFuncs/V6/index.js";
import setFocus from "../SetFocus/V4/index.js";
import tableCodeOnly from "./tableCodeOnly.js";

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

    const showSearch = options.firstRow.showSearch;

    const showActions = options?.table?.showActions;

    const inShowShow = options?.table?.body?.showShow;
    const inShowEdit = options?.table?.body?.showEdit;
    const inShowDelete = options?.table?.body?.showDelete;
    const inDeleteType = options?.table?.body?.deleteType;
    const inDeleteIconSize = options?.table?.body?.deleteIconSize;
    const firstRow = options?.firstRow;
    // debugger;
    buildFullUI({
        containerEl: containerEl,
        inTableName: inConfig.tableName,
        inIsShowHeaderRow: showSearch,
        inShowSerial: showSerial,
        inSerialWidth: serialWidth,
        inShowActions: showActions, inShowShow,
        inShowEdit, inShowDelete, inDeleteType, inDeleteIconSize,
        inFirstRow: options?.firstRow, dataStore,
        inConfig
    });

    tableCodeOnly({
        containerEl,
        dataStore,
        dom,
        options,
        uiClasses,
        inDefaults,
        inConfig, callbacks
    });

    if (showSearch) {
        searchFuncs({
            inContainerEl: containerEl,
            inFirstRow: options?.firstRow
        });
    };

    setFocus({ inContainerEl: containerEl });
};

export default startFunc;