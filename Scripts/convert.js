import fs from 'fs';
import path from 'path';

const dataFolder = path.join('..', 'Data');

// Ensure data folder exists
if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder, { recursive: true });
}

const transactionsFile = 'Transactions_min.json';
const allJsonPath = path.join(dataFolder, 'all.json');

const convertFunc = (inJsonData) => {
    const newData = inJsonData.map(element => {
        return {
            date: element.date,
            vchstatusdate: element.vchstatusdate,
            guid: element.guid,
            narration: element.narration,
            vouchertypename: element.vouchertypename,
            partyledgername: element.partyledgername,
            vouchernumber: element.vouchernumber,
            numberingstyle: element.numberingstyle,
            effectivedate: element.effectivedate,
            vchstatusdate: element.vchstatusdate,
            alterid: element.alterid,
            masterid: element.masterid,
            voucherkey: element.voucherkey,
            voucherretainkey: element.voucherretainkey,
            vouchernumberseries: element.vouchernumberseries,
            allledgerentries: convert_allledgerentries(element?.allledgerentries),
            allinventoryentries: convert_allinventoryentries(element?.allinventoryentries),
            ledgerentries: convert_allledgerentries(element?.ledgerentries),
            inventoryentriesin: convert_allinventoryentries(element?.inventoryentriesin)
        };
    });

    return newData;
};

const convert_allinventoryentries = (allinventoryentries) => {
    if (!allinventoryentries) return [];

    const newData = allinventoryentries.map(element => {
        return {
            stockitemname: element.stockitemname,
            rate: element.rate,
            amount: element.amount,
            actualqty: element.actualqty,
            billedqty: element.billedqty,
            batchallocations: convert_batchallocations(element.batchallocations)
        };
    });

    return newData;
};

const convert_allledgerentries = (allledgerentries) => {
    if (!allledgerentries) return [];

    const newData = allledgerentries.map(element => {
        return {
            ledgername: element.ledgername,
            amount: element.amount,
            vatexpamount: element?.vatexpamount
        };
    });

    return newData;
};

const convert_batchallocations = (batchallocations) => {
    if (!batchallocations) return [];

    const newData = batchallocations.map(element => {
        return {
            godownname: element.godownname,
            batchname: element.batchname,
            destinationgodownname: element.destinationgodownname,
            actualqty: element.actualqty,
            billedqty: element.billedqty,
            amount: element.amount
        };
    });

    return newData;
};

if (fs.existsSync(transactionsFile)) {
    console.log(`Reading ${transactionsFile}...`);
    const transactionsContent = fs.readFileSync(transactionsFile, 'utf-8');

    const newData = convertFunc(JSON.parse(transactionsContent)?.tallymessage);
    console.log(`Writing to ${allJsonPath}...`);

    fs.writeFileSync(allJsonPath, JSON.stringify(newData));

    console.log('Data successfully copied to Data/all.json!');
} else {
    console.log(`Warning: ${transactionsFile} not found.`);
}
