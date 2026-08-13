import getData from "./getData.js";

const startFunc = async ({ inTablePath }) => {
    const dataAsArray = await getData({ inTablePath });

//    const filteredData = await db.data.filter(obj => obj.vchtype === vchtype);
    const grouped = Object.groupBy(dataAsArray, item => item.vchtype);

    const counts = Object.fromEntries(
        Object.entries(grouped).map(([key, value]) => [key, value.length])
    );
    return await counts;
};

export { startFunc };
