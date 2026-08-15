import clientEval from "./clientEval/index.js";
import dataListDynamic from "./dataListDynamic/index.js";

const executeKeyDownType = ({ currentInput, inClosestControl,
    inOnKeyDownType, inOptions }) => {

    if (inOnKeyDownType === "dataListDynamic") {
        dataListDynamic({
            currentInput, inClosestControl, inOptions
        });
    } else {
        clientEval({
            currentInput, inClosestControl
        });
    };
};

export default executeKeyDownType;