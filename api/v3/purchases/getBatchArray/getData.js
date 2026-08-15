import { JSONFilePreset } from 'lowdb/node'

const startFunc = async ({ columnName, inTablePath }) => {
    try {
        const returnArray = [];

        const db = await JSONFilePreset(inTablePath, []);

        await db.read();

        await db.data.forEach(mainLine => {
            mainLine[columnName]?.forEach(itemLine => {
                itemLine?.batchallocations.forEach(element => {
                    returnArray.push({
                        vchtype: mainLine?.vchtype,
                        date: mainLine?.date,
                        vouchernumber: mainLine?.vouchernumber,
                        stockitemname: itemLine?.stockitemname,
                        rate: itemLine?.rate,
                        amount: parseInt(itemLine?.amount),
                        actualqty: itemLine?.actualqty,
                        billedqty: itemLine?.billedqty,
                        godownname: element?.godownname,
                        destinationgodownname: element?.destinationgodownname,
                        batchname: element?.batchname,
                        batchactualqty: element?.actualqty,
                        batchbilledqty: element?.billedqty,
                        batchamount: parseInt(element?.amount),

                        batchqty: element?.actualqty.slice(0, -4),
                        batchbilledqty: element?.billedqty.slice(0, -4),

                        inQty: parseInt(element?.amount) < 0 ? element?.actualqty.slice(0, -4) : 0,

                        outQty: parseInt(element?.amount) < 0 ? 0 : element?.actualqty.slice(0, -4)
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
