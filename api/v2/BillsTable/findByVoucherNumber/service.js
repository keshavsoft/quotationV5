import getData from "./getData.js";

const startFunc = async ({ vounum, inTablePath }) => {
    const dataAsArray = await getData({ vounum, inTablePath });

    return await dataAsArray;
};

export { startFunc };
