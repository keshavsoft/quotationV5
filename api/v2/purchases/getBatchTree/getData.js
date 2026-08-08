import { JSONFilePreset } from 'lowdb/node'

const getItemsArray = async ({ columnName, inTablePath }) => {
    try {
        const returnArray = [];

        const db = await JSONFilePreset(inTablePath, []);

        await db.read();

        const inventoryData = await db.data.forEach(mainLine => {
            mainLine[columnName]?.forEach(itemLine => {
                const batches = itemLine?.batchallocations.forEach(element => {
                    returnArray.push({
                        stockitemname: itemLine?.stockitemname,
                        batchname: element?.batchname
                    });
                });
            });
        });

        return returnArray;

    } catch (error) {
        console.log("eeeee : ", error);

    };
};

const startFunc = async ({ columnName, inTablePath }) => {
    try {
        const returnArray = await getItemsArray({ columnName, inTablePath });

        const grouped = Object.groupBy(returnArray, (item) => item.stockitemname);

        const result = Object.fromEntries(
            Object.entries(grouped).map(([key, items]) => [
                key,
                items.map(({ stockitemname, ...rest }) => rest?.batchname) // Destructure to omit 'type'
            ])
        );

        return result;
    } catch (error) {
        console.log("eeeee : ", error);

    };
};

export default startFunc;
