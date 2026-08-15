import buildBody from "../../../../BuildTableVersions/V6/BuildBodyVersions/V9/start.js";
// import buildBody from "../BuildTableVersions/V6/BuildBodyVersions/V9/start.js";

const createDiv = (id) => {
    const div = document.createElement("div");
    div.id = id;

    document.body.appendChild(div);

    return div;
};

const prepareConfig = ({ dataStore, inConfig,
    containerEl, dom }) => {

    const visibleColumnsConfig = dataStore.getVisibleColumnsConfig();
    const config = { ...inConfig, clearOld: false };
    const tableBody = dom.getTableBody(containerEl);

    // console.log("kkkkkkkkkkk : ", visibleColumnsConfig);
    console.log("--------kkkkkkkkkkk---- : ", config?.callbacks?.vertical?.columns);

    for (const key in config?.callbacks?.vertical?.columns) {
        config.callbacks.vertical.columns[key].onClick = (dataToShow) => {
            buildBody({
                inVisibleColumnsConfig: visibleColumnsConfig,
                inTableBody: tableBody, inData: dataToShow,
            });
        };
    };

    // config.callbacks.vertical.columns.stockitemname.onClick = (dataToShow) => {
    //     // console.log("aaaaaaa------------------------------ : ", dataToShow);
    //     buildBody({
    //         inVisibleColumnsConfig: visibleColumnsConfig,
    //         inTableBody: tableBody, inData: dataToShow,
    //     });

    //     // callbacks
    // };

    return config;
};

const startFunc = ({ dataStore, inConfig,
    containerEl, dom }) => {

    const config = prepareConfig({
        dataStore, inConfig,
        containerEl, dom
    });


    // const visibleColumnsConfig = dataStore.getVisibleColumnsConfig();
    // const config = { ...inConfig, clearOld: false };
    // const tableBody = dom.getTableBody(containerEl);
    // // debugger;
    // // console.log("kkkkkkkkkkk : ", visibleColumnsConfig);
    // console.log("--------kkkkkkkkkkk---- : ", config?.callbacks?.vertical?.columns);



    // config.callbacks.vertical.columns.stockitemname.onClick = (dataToShow) => {
    //     // console.log("aaaaaaa------------------------------ : ", dataToShow);
    //     buildBody({
    //         inVisibleColumnsConfig: visibleColumnsConfig,
    //         inTableBody: tableBody, inData: dataToShow,
    //     });

    //     // callbacks
    // };

    const k1 = new window.ks.classes.vertical(config);

    k1.initCreate();

    // const div = createDiv("myDiv");

    // return div;
};

export default startFunc;
