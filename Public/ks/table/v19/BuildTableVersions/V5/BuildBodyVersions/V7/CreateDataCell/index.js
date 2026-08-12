import createTd from "./createTd.js";

const createDataCell = ({
    value,
    searchValue, inClassName,
    inCellConfig = {}, inOnKeyDownType,
    inEnterAsTab, inEvalformula, inEvalToControl
}) => {

    const width =
        inCellConfig.width;
    // console.log("gggggggggg : ", inCellConfig);

    const td = createTd({
        inValue: value, inRightAlign: inCellConfig.rightAlign,
        inWidth: width, inSearchValue: searchValue,
        inEnterAsTab, inEvalformula, inEvalToControl,
        inOnKeyDownType, inClassName,
        inShowThousandsSeperator: inCellConfig.showThousandsSeperator
    });

    return td;
};

export default createDataCell;