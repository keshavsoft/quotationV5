import rawItemsConfig from "../../../../../../../itemsConfig.json" with { type: "json"};

import { modifyItemsConfig } from "../pure/modifyItemsConfig.js";
import { initTable } from "./table.js";
import { writeHtmlId } from "../dom/writeHtmlId.js";

// import rawItemsConfig from "./config/itemsConfig.json" with { type: "json"};

const onSuccess = async (fromService) => {
    if (fromService) {
        writeHtmlId(fromService);

        const itemsConfig = modifyItemsConfig(rawItemsConfig, fromService);

        const onUpdate = (updateFromService) => {
            console.log("----- : ", updateFromService);
        };

        window.ksTable1 = initTable(itemsConfig, onUpdate);
    }
};

export { onSuccess };
