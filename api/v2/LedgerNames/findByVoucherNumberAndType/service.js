import getData from "./getData.js";

const startFunc = async ({ vchtype, vounum, inTablePath }) => {
    const dataAsArray = await getData({ vchtype, vounum, inTablePath });

    return await dataAsArray;
};

export { startFunc };
