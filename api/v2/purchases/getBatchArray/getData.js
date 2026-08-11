import { JSONFilePreset } from 'lowdb/node'

const startFunc = async ({ columnName, inTablePath }) => {
    try {
        const returnArray = [];

        const db = await JSONFilePreset(inTablePath, []);

        await db.read();

        const inventoryData = await db.data.forEach(mainLine => {
            mainLine[columnName]?.forEach(itemLine => {
                const batches = itemLine?.batchallocations.forEach(element => {
                    returnArray.push({
                        stockitemname: itemLine?.stockitemname,
                        batchname: element?.batchname,
                        vchtype: mainLine?.vchtype,
                        date: mainLine?.date,
                        vouchernumber: mainLine?.vouchernumber
                    });
                });
            });
        });

        return returnArray;

    } catch (error) {
        console.log("eeeee : ", error);

    };
};

export default startFunc;
