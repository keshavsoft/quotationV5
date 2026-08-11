import commonFuncToRun from "./switchFunc/index.js";

const executeKeyDownType = ({
    currentInput, inOptions,
    inDefaultRow, closestTagIsTr
}) => {
    let closestControl;

    let el = currentInput.parentElement;

    while (el && !el.tagName.includes("-")) {
        el = el.parentElement;
    };

    const onKeyDownType = el.getAttribute("onKeyDownType");

    if (closestTagIsTr) {
        closestControl = currentInput.closest("tr");
    };

    if (onKeyDownType) {
        // console.log("onKeyDownType : ", onKeyDownType);

        commonFuncToRun({
            currentInput, inClosestControl: closestControl,
            inOnKeyDownType: onKeyDownType, inOptions
        });
    };
};

export default executeKeyDownType;