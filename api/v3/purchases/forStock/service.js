import getData from "./getData.js";

const startFunc = async ({ inTablePath }) => {
    const dataAsArray = await getData({ inTablePath });
    const returnArray = [];

    const inventoryVouchers = dataAsArray.filter(element => {
        return "allinventoryentries" in element;
    });

    inventoryVouchers.forEach(loopInventoryVoucher => {
        loopInventoryVoucher?.allinventoryentries.forEach(loopItem => {
            returnArray.push({
                stockitemname: loopItem?.stockitemname,
                billedqty: loopItem?.billedqty,
                vouchernumber: loopInventoryVoucher?.vouchernumber,
                date: loopInventoryVoucher?.date,
                vchtype: loopInventoryVoucher?.vchtype,
            });
        });
    });

    return await returnArray[0];
};

export { startFunc };
