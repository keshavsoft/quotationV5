import { buildDataListContainer } from "../builders/buildDataListContainer.js";
import buildTableShell from "../BuilderVersions/V2/buildTableShell.js";
import buildFirstRow from "./buildFirstRow.js";

export const buildFullUI = ({ containerEl, inTableName, inIsDataListNeeded = true,
    inIsTableNeeded = true, inIsShowHeaderRow = false,
    inUiClasses, clearOld = true, inShowSerial, inShowActions,
    inShowEdit, inShowDelete, inDeleteType, inDeleteIconSize,
    inShowShow, inFirstRow, dataStore, inConfig, dom }) => {

    const root = containerEl;
    root.className = "max-w-6xl mx-auto p-2";
    // debugger;
    if (clearOld) root.innerHTML = "";

    let children = [];

    if (inIsTableNeeded) {
        const { wrapper } = buildTableShell({
            inTableClassName: inUiClasses?.table?.tableClass,
            inShowSerial, inShowActions, inShowShow,
            inShowEdit, inShowDelete, inDeleteType, inDeleteIconSize
        });

        root.append(wrapper);
        // children.push(wrapper);
    };

    if (inIsDataListNeeded) {
        const { container: dataList } = buildDataListContainer();
        root.append(dataList);
        // children.push(dataList);
    };

    if (inIsShowHeaderRow) {
        // debugger
        const { header } = buildFirstRow({
            containerEl: root, dataStore, dom,
            inTitleText: inTableName,
            inFirstRow: inFirstRow, inConfig
        })
        // const { header } = buildHeaderRow({ inTitleText: inTableName });
        root.prepend(header);

        // if (fromBuildFirstRow?.header) {


        //     // children.push(fromBuildFirstRow?.header);
        // };
    };

    // root.replaceChildren(...children);
};