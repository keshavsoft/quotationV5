import { JSONFilePreset } from 'lowdb/node'

const startFunc = async ({ columnName, inTablePath }) => {
    try {
        const returnArray = [];

        const db = await JSONFilePreset(inTablePath, []);

        await db.read();

        // const filteredData = await db.data.map(obj => obj[columnName]);

        const inventoryData = await db.data.forEach(mainLine => {
            mainLine[columnName]?.forEach(itemLine => {
                const batches = itemLine?.batchallocations.map(element => {
                    return element?.batchname;
                });

                returnArray.push({
                    stockitemname: itemLine?.stockitemname,
                    batches
                });
            });

        });


        // console.log(filteredData)
        return returnArray;

    } catch (error) {
        console.log("eeeee : ", error);

    };
};

export default startFunc;
