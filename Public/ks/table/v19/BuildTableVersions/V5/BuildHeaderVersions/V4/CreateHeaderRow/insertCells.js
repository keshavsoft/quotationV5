import createHeaderCell from "./CreateHeaderCell/start.js";

const startFunc = ({
    inVisibleColumnsConfig,
    tr,
    inClassName
}) => {

    for (const value of inVisibleColumnsConfig) {

        // console.log("hhhhhhhhh : ", value.tableConfig?.headerConfig?.hideOnPrint);

        const width =
            value?.cellConfig?.width;

        tr.appendChild(
            createHeaderCell({
                inKey: value.columnName,
                inClassName: value.tableConfig?.headerConfig?.className || inClassName,
                inWidth: width,
                inTitle: value.title,
            })
        );

    };

};

export default startFunc;