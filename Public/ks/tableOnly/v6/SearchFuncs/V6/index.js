import allColumnsSearch from "./allColumnsSearch/index.js";

const startFunc = ({
    inContainerEl,
    inFirstRow
}) => {
// debugger;
    if (inFirstRow?.allColumns) {
        allColumnsSearch({
            inContainerEl,
            inFirstRow
        });

    };
};

export default startFunc;