import createForm from "../BuildHtmlForm/V4/index.js";
import buildDataLists from "../BuildDataLists/V2/addToDom.js";
import FocusSet from "../FocusSet/V3/focusSet.js";

import { buildFullUI } from "./compose/buildFullUI.js";

const startFunc = ({
    containerEl,
    dataStore,
    dom,
    services,
    options,
    callbacks,
    inConfig, uiClasses
}) => {

    const visibleColumnsConfig = dataStore.getVisibleColumnsConfig();

    const data = dataStore.getData();
    const showSearch = options?.firstRow?.showSearch;
    const showDataList = options?.vertical?.showDataList;

    const findDataFromParams = dataStore.getFindFromParams();
    debugger
    const isFormDisabled = options.vertical.isFormDisabled;
    const showSaveButton = options.vertical.showSaveButton;
    const verticalOptions = options.vertical;
    const clearOld = inConfig?.clearOld;
    //     console.log("vvvvvvvvvvvvv : ", clearOld);
    // debugger;
    buildFullUI({
        containerEl: containerEl,
        inTableName: inConfig.tableName,
        inIsShowHeaderRow: showSearch,
        inIsTableNeeded: false,
        inIsShowHeaderRow: false, clearOld
    });

    if (true) {
        const searchForm = createForm({
            inVisibleColumnsConfig: visibleColumnsConfig,
            inColumnsConfig: visibleColumnsConfig,
            inServices: services,
            inConfig,
            inShowButton: false,
            uiClasses: uiClasses?.form,
            inDataStore: dataStore,
            showSaveButton: showSaveButton,
            inDefaultRow: findDataFromParams,
            inIsDisabled: isFormDisabled,
            inVerticalOptions: verticalOptions,
            inCallBacks: callbacks
        });

        containerEl.prepend(searchForm);
    };

    if (showDataList) {
        buildDataLists({
            inContainerEl: containerEl,
            inDataStore: dataStore,
            inDom: dom,
            inData: data,
            inDataListColumns: visibleColumnsConfig
        });
    };

    FocusSet({
        inContainerEl: containerEl,
        inPriority: ["vertical"]
    })
};

export default startFunc;