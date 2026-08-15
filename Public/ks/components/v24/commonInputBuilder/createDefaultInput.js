const returnDefault = ({ inCol, inDefaultRow }) => {
    if ("defaultvalue" in inCol) {
        return inCol.defaultvalue
    };

    const defaultValue = inCol in inDefaultRow ? inDefaultRow[inCol] : "";
    return defaultValue;
};

export const createDefaultInput = ({ inCol, inDefaultRow, inDataStore,
    inDataListFillName, inType, inEnterAsTab, rowClass, dataListSource }) => {
    // console.log("pppppppppp : ", inCol);

    const col = inCol.columnName;
    const row = document.createElement("ks-input-no-enter");

    const defaultValue = returnDefault({ inCol, inDefaultRow });

    row.setAttribute("label", inCol.title);
    row.setAttribute("ksName", col);
    row.setAttribute("source", col);
    row.setAttribute("tabIndex", inCol.tabIndex);
    row.setAttribute("ksDataListSource", dataListSource);

    if (inCol?.uiClasses?.form.labelClass) row.setAttribute("ksLabelClass", inCol?.uiClasses?.form?.labelClass);
    if (rowClass) row.setAttribute("ksRowClass", rowClass);

    if (inType !== undefined) {
        row.setAttribute("type", inType);
    };

    if (defaultValue) {
        row.setAttribute("ksInValue", defaultValue);
    };

    if (inCol?.verticalConfig) {
        if ("allowOnChange" in inCol.verticalConfig) {
            row.setAttribute("ksAllowOnChange", inCol.verticalConfig.allowOnChange);
        }
        if ("onKeyDownType" in inCol.verticalConfig) {
            row.setAttribute("ksOnKeyDownType", inCol.verticalConfig.onKeyDownType);
        }
    };

    if (inDataListFillName) {
        row.setAttribute("ksDataListFillName", inDataListFillName);
    };

    if (inEnterAsTab) {
        row.setAttribute("enterAsTab", inEnterAsTab);
    };

    row.dataStore = inDataStore;

    row.verticalConfig = inCol?.verticalConfig;
    // inputs[col] = row;

    if (inCol?.hide) {
        row.setAttribute("style", "display:none");
    };

    return row;
};
