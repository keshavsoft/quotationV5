import allColumns from "../builders/buildHeaderRow/allColumns/index.js";
import columnWiseSearch from "../builders/buildHeaderRow/columnWiseSearch/index.js";

const startFunc = ({ inFirstRow, inTitleText, dataStore, inConfig }) => {
    if (inFirstRow?.allColumns) {
        const fromBuildHeaderRow = allColumns({ inTitleText });

        return fromBuildHeaderRow;
    };

    if (inFirstRow?.columnWiseSearch) {
        const fromColumnWiseSearch = columnWiseSearch({
            inTitleText,
            dataStore, inConfig
        });

        return fromColumnWiseSearch;
    };
};

export default startFunc;