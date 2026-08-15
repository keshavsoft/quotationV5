import buildHeader from "../BuildTableVersions/V6/BuildHeaderVersions/V4/index.js";
import buildBody from "../BuildTableVersions/V6/BuildBodyVersions/V9/start.js";
import buildFooter from "../BuildTableVersions/V6/BuildFooterVersions/ForBoth/V2/start.js";

const startFunc = ({
    containerEl,
    dataStore,
    dom,
    options,
    uiClasses,
    inDefaults, inShowBody = true,
    inConfig, callbacks
}) => {
    // debugger
    const visibleColumnsConfig = dataStore.getVisibleColumnsConfig();

    const showSerial = options.table.showSerial;
    const serialWidth = options.table.serialWidth;

    const showActions = options?.table?.showActions;
    const showFooter = options?.table?.showFooter;
    const optionsWidth = options.table.optionsWidth;
    const footerOptions = options.table?.footer;

    const defaults = inDefaults;
    const data = defaults.data;
    // debugger;
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

    if (inShowBody) {
        const tableBody = dom.getTableBody(containerEl);

        buildBody({
            inVisibleColumnsConfig: visibleColumnsConfig,
            inTableBody: tableBody,
            inData: data, inConfig, callbacks
        });
    };

    // debugger;
    if (showFooter) {
        buildFooter({
            inVisibleColumnsConfig: visibleColumnsConfig,
            inTableFooter: dom.getTableFooter(containerEl),
            inOptions: footerOptions,
            inData: data
        });
    };
};

export default startFunc;