// import allColumns from "../builders/buildHeaderRow/allColumns/index.js";
import columnWiseSearch from "../builders/buildHeaderRow/columnWiseSearch/index.js";

const startFunc = ({ inFirstRow, inTitleText, dataStore, inConfig,
    containerEl, dom }) => {
    // debugger
    // if (inFirstRow?.allColumns) {
    //     const fromBuildHeaderRow = allColumns({ inTitleText });

    //     return fromBuildHeaderRow;
    // };
    columnWiseSearch({
        inTitleText, containerEl, dom,
        dataStore, inConfig
    });

    // if (inFirstRow?.columnWiseSearch) {
    //     columnWiseSearch({
    //         inTitleText, containerEl, dom,
    //         dataStore, inConfig
    //     });
    // };
};

export default startFunc;