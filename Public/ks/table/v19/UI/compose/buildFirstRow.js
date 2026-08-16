// import allColumns from "../builders/buildHeaderRow/allColumns/index.js";
import columnWiseSearch from "../builders/buildHeaderRow/columnWiseSearch/index.js";

const startFunc = ({ inTitleText, dataStore, inConfig,
    containerEl, dom }) => {

    columnWiseSearch({
        inTitleText, containerEl, dom,
        dataStore, inConfig
    });
};

export default startFunc;