import configJson from "/Index/configs/billShow.json" with { type: "json" };

// import configJson from "../../../../../configs/billShow.json" with { type: "json" };

export const getKSTableConfig = async () => {
    let fromConfig = structuredClone(configJson);

    return fromConfig
};