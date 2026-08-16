import buildBody from "../../../../BuildTableVersions/V6/BuildBodyVersions/V9/start.js";

const prepareConfig = ({ dataStore, inConfig,
    containerEl, dom }) => {

    const visibleColumnsConfig = dataStore.getVisibleColumnsConfig();
    const config = { ...inConfig, clearOld: false };
    const tableBody = dom.getTableBody(containerEl);

    const data = dataStore.getData();

    for (const key in config?.callbacks?.vertical?.columns) {
        config.callbacks.vertical.columns[key].onClick = ({ filterKey, filterValue }) => {
            // console.log("filterKey : ", filterKey);
            // console.log("filterValue : ", filterValue);

            const dataToShow = data.filter(element => {
                return element[filterKey] === filterValue;
            });

            // console.log("dataToShow : ", dataToShow);
            buildBody({
                inVisibleColumnsConfig: visibleColumnsConfig,
                inTableBody: tableBody, inData: dataToShow,
            });
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
