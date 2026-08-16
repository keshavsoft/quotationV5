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
            allledgerentries: element?.allledgerentries,
            allinventoryentries: element?.allinventoryentries,
            ledgerentries: element?.ledgerentries,
            inventoryentriesin: element?.inventoryentriesin
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
