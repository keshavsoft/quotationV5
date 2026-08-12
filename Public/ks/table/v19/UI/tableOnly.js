import buildHeader from "../BuildTableVersions/V5/BuildHeaderVersions/V4/index.js";
import buildBody from "../BuildTableVersions/V5/BuildBodyVersions/V7/start.js";
import buildFooter from "../BuildTableVersions/V5/BuildFooterVersions/ForBoth/V3/start.js";

const startFunc = ({
    containerEl,
    dataStore,
    dom,
    services,
    options,
    endPoints,
    uiClasses,
    callbacks,
    inConfig
}) => {
    const visibleColumnsConfig = dataStore.getVisibleColumnsConfig();

    const data = dataStore.getData();
    const showSerial = options.table.showSerial;
    const serialWidth = options.table.serialWidth;
    const showDataList = options.table.showDataList;

    const showTotals = options?.table?.showTotals;
    const showBalance = options?.table?.showBalance;
    const showTotalsForSearch = options?.table?.showTotalsForSearch;
    const showBalanceForSearch = options?.table?.showBalanceForSearch;

    const showActions = options?.table?.showActions;
    const showFooter = options?.table?.showFooter;
    const optionsWidth = options.table.optionsWidth;
    const footerOptions = options.table?.footer;

    const toSaveRow = dataStore.getToSaveRow();

    buildHeader({
        inContainerEl: containerEl,
        inDom: dom,
        inThClassName: uiClasses?.thead?.thClass,
        inTrClassName: uiClasses?.thead?.trClass,
        inThSerialClassName: uiClasses?.thead?.thSerialClass,
        inVisibleColumnsConfig: visibleColumnsConfig,
        inShowSerial: showSerial,
        inSerialWidth: serialWidth,
        inShowActions: showActions,
        inOptionsWidth: optionsWidth,
    });

    const tableBody = dom.getTableBody(containerEl);

    buildBody({
        inVisibleColumnsConfig: visibleColumnsConfig,
        inTableBody: tableBody,
        inData: data,
        inServices: services,
        inEndPoints: endPoints,
        inDataStore: dataStore,
        inConfig,
        inTableFooter: dom.getTableFooter(containerEl)
    });
    // debugger;
    if (showFooter) {
        buildFooter({
            inTableFooter: dom.getTableFooter(containerEl),
            options,
            inVisibleColumnsConfig: visibleColumnsConfig,
            inData: data,
            inShowTotals: showTotals,
            inShowBalance: showBalance,
            inShowTotalsForSearch: showTotalsForSearch,
            inShowBalanceForSearch: showBalanceForSearch,
            inShowDataList: showDataList,
            inServices: services,
            inEndPoints: endPoints,
            inDataStore: dataStore,
            inTableBody: tableBody,
            inOptions: footerOptions,
            inToSaveRow: toSaveRow, callbacks: callbacks?.table?.footer,
            inConfig
        });
    };
};

export default startFunc;