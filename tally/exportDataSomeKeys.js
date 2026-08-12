/**
 * exportData.js — export specific columns from all records to a JSON file
 * 
 * Extracts: allinventoryentries, vouchernumber, date, vchtype, type
 * 
 * Usage:
 *   node exportData.js [output_file.json]
 *   (defaults to exported_data.json if no name is given)
 */

import { streamRecords } from './tallyStream.js';
import fs from 'fs';

const outFile = process.argv[2] || 'exported_data.json';
const outStream = fs.createWriteStream(outFile, 'utf8');

console.log(`Extracting records to ${outFile}...`);
outStream.write('[\n');

let count = 0;

const forAllledgerentries = (allledgerentries) => {
    if (!Array.isArray(allledgerentries)) return [];
    return allledgerentries.map(element => {
        return {
            ledgername: element?.ledgername,
            amount: element?.amount,
            billallocations: element?.billallocations
        }
    });
};

const forAccountingallocations = (accountingallocations) => {
    if (!Array.isArray(accountingallocations)) return [];
    return accountingallocations.map(element => {
        return {
            ledgername: element?.ledgername,
            amount: element?.amount
        }
    });
};

const forBatches = (batchallocations) => {
    if (!Array.isArray(batchallocations)) return [];
    return batchallocations.map(element => {
        return {
            godownname: element?.godownname,
            batchname: element?.batchname,
            amount: element?.amount,
            actualqty: element?.actualqty,
            billedqty: element?.billedqty
        }
    });
};

const forInventory = (allinventoryentries) => {
    if (!Array.isArray(allinventoryentries)) return [];
    return allinventoryentries.map(element => {
        return {
            stockitemname: element?.stockitemname,
            rate: element?.rate,
            amount: element?.amount,
            actualqty: element?.actualqty,
            billedqty: element?.billedqty,
            basicuserdescription: element?.basicuserdescription,
            batchallocations: forBatches(element?.batchallocations),
            accountingallocations: forAccountingallocations(element?.accountingallocations)
        }
    });
};

await streamRecords((rec) => {
    // Pick only the specific fields requested
    const out = {
        allinventoryentries: forInventory(rec.allinventoryentries),
        vouchernumber: rec.vouchernumber,
        date: rec.date,
        vchtype: rec.metadata?.vchtype,
        type: rec.metadata?.type,
        allledgerentries: forAllledgerentries(rec?.allledgerentries)
    };

    if (count > 0) {
        outStream.write(',\n');
    }
    outStream.write(JSON.stringify(out, null, 2));
    count++;
});

outStream.write('\n]\n');
outStream.end();

console.log(`\nDone! Exported ${count} records to ${outFile}`);
