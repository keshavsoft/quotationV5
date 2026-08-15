import configJson from "../../../../tableShow.json" with { type: "json" };

const jFLocalToInputkSTableContainer = (inValue) => {
    const jVarLocalHtmlId = 'kSTableContainer';
    const jVarLocalkSTableContainer = document.getElementById(jVarLocalHtmlId);

    if (jVarLocalkSTableContainer) {
        jVarLocalkSTableContainer.innerHTML = inValue;
    };
};

const prepareArray = (inFetchData) => {
    let toReturnArray = [];

    for (const [key, value] of Object.entries(inFetchData)) {
        toReturnArray.push({
            stockitemname: key,
            batchCount: value.length
        })
    };

    const sortedArray = toReturnArray.sort((a, b) => a.stockitemname.localeCompare(b.stockitemname));

    return sortedArray;
};

const clickFuncToRun = async ({ inCurrentTarget }) => {
    jFLocalToInputkSTableContainer("");

    const config = structuredClone(configJson);

    // config.options.firstRow.showSearch = true;
    // config.options.firstRow.allColumns = true;

    const fromFetch = await fetch(config?.endPoints?.read);
    const dataFromFetch = await fromFetch.json();

    const arrayData = prepareArray(dataFromFetch);

    config.defaults.data = arrayData;

    if (config.callbacks) {
        if (config.callbacks.table.body.show) {
            config.callbacks.table.body.show = {};
        };

        if (config.callbacks.table.body.edit) {
            config.callbacks.table.body.edit = {};
        };
    }

    const ksTable1 = new window.ks.classes.tableShowOnly(config);
    ksTable1.initShowTable();
};

export { clickFuncToRun };