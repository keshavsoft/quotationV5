import { createDataListInput } from "./createDataListInput.js";
import { createDefaultInput } from "./createDefaultInput.js";

export const createInputRow = ({ inCol, inDefaultRow, inDataStore, inEnterAsTab,
    rowClass, inCallBacks
}) => {

    const dataListFillName = inCol.dataListFillName;

    const dataListSource = inCol.dataListSource;

    // console.log("dataListFillName : ", dataListFillName);

    let row;

    if (window.ksShowLogTree.components.vertical.htmlForm) console.log("window.ksShowLogTree.components.vertical.htmlForm - createInputRow : ", inCol);

    if ("verticalConfig" in inCol) {
        if ("dataListSource" in inCol) {
            // row = createDataListInput({
            //     inCol, inDefaultRow, inDataStore,
            //     inEnterAsTab
            // });

            row = createDefaultInput({
                inCol,
                inDefaultRow,
                inDataStore, inEnterAsTab,
                inDataListFillName: dataListFillName,
                inType: "type" in inCol ? inCol.type : "",
                rowClass, dataListSource, inCallBacks
            });

        } else {
            row = createDefaultInput({
                inCol,
                inDefaultRow,
                inDataStore, inEnterAsTab,
                inDataListFillName: dataListFillName,
                inType: "type" in inCol ? inCol.type : "",
                rowClass
            });
        }
    }

    return row;
};
