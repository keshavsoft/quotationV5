import { getKSTableConfig } from "./getKSTableConfig.js";
import clubData from "./helpers/clubData.js";

const jFLocalToInputkSTableContainer = (inValue) => {
    const jVarLocalHtmlId = 'kSTableContainer';
    const jVarLocalkSTableContainer = document.getElementById(jVarLocalHtmlId);

    if (jVarLocalkSTableContainer) {
        jVarLocalkSTableContainer.innerHTML = inValue;
    };
};

const startFunc = async () => {
    jFLocalToInputkSTableContainer("");

    const config = await getKSTableConfig();

    config.defaults.data = await clubData();

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

export default startFunc;