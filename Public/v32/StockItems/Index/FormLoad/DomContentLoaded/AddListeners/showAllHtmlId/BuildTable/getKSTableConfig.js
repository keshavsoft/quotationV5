import configJson from "./configs/billShow.json" with { type: "json" };

export const getKSTableConfig = async () => {
    let fromConfig = structuredClone(configJson);

    return fromConfig
};