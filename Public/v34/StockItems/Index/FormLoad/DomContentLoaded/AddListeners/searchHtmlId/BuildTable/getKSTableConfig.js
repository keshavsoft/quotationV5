import configJson from "./configs/billShow.json" with { type: "json" };

export const getKSTableConfig = async () => {
    let fromConfig = structuredClone(configJson);

    fromConfig.options.firstRow.showSearch = true;
    fromConfig.options.firstRow.allColumns = true;

    return fromConfig
};