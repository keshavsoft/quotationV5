import allColumns from "../builders/buildHeaderRow/allColumns/index.js";
import columnWiseSearch from "../builders/buildHeaderRow/columnWiseSearch/index.js";

const startFunc = ({ inFirstRow, inTitleText, dataStore, inConfig,
    containerEl, dom }) => {
    // debugger
    if (inFirstRow?.allColumns) {
        const fromBuildHeaderRow = allColumns({ inTitleText });

        return fromBuildHeaderRow;
    };

    if (inFirstRow?.columnWiseSearch) {
        const fromColumnWiseSearch = columnWiseSearch({
            inTitleText, containerEl, dom,
            dataStore, inConfig
        });

        return fromColumnWiseSearch;
    };
};

export default startFunc;