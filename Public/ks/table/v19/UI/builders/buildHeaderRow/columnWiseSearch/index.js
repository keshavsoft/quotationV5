import buildBody from "../../../../BuildTableVersions/V6/BuildBodyVersions/V9/start.js";
import updateFooter from "../../../../BuildTableVersions/V5/AfterMutation/V5/UpdateFooter/V2/start.js";

const prepareConfig = ({ dataStore, inConfig,
    containerEl, dom }) => {

    const visibleColumnsConfig = dataStore.getVisibleColumnsConfig();
    const config = { ...inConfig, clearOld: false };
    const tableBody = dom.getTableBody(containerEl);
    const tableFooter = dom.getTableFooter(containerEl);

    const data = dataStore.getData();

    for (const key in config?.callbacks?.vertical?.columns) {
        config.callbacks.vertical.columns[key].onClick = ({ filterKey, filterValue }) => {

            const dataToShow = data.filter(element => {
                return element[filterKey] === filterValue;
            });

            buildBody({
                inVisibleColumnsConfig: visibleColumnsConfig,
                inTableBody: tableBody, inData: dataToShow,
            });
            // debugger
            updateFooter({
                inVisibleColumnsConfig: visibleColumnsConfig,
                inTableFooter: tableFooter, inData: dataToShow,
                inShowFooterRows: true,
                inShowTotals: true
            });

            //   inTableFooter,
            // inData: dataToShow,
            // inShowFooterRows: true,
            // inShowTotals: true

        };
    };

    return config;
};

const startFunc = ({ dataStore, inConfig,
    containerEl, dom }) => {

    const config = prepareConfig({
        dataStore, inConfig,
        containerEl, dom
    });

    const k1 = new window.ks.classes.vertical(config);

    k1.initCreate(false);
};

export default startFunc;
