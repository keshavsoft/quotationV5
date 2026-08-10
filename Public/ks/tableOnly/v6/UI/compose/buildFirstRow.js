import allColumns from "../builders/buildHeaderRow/allColumns/index.js";
import columnWiseSearch from "../builders/buildHeaderRow/columnWiseSearch/index.js";

const startFunc = ({ inFirstRow, inTableName, dataStore }) => {
    if (inFirstRow?.allColumns) {
        const fromBuildHeaderRow = allColumns({ inTitleText: inTableName });

        return fromBuildHeaderRow;
    };

    if (inFirstRow?.columnWiseSearch) {
        const fromColumnWiseSearch = columnWiseSearch({
            inTitleText: inTableName,
            dataStore
        });

        return fromColumnWiseSearch;
    };
};

export default startFunc;