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

await streamRecords((rec) => {
    // Pick only the specific fields requested
    const out = {
        allinventoryentries: rec.allinventoryentries,
        vouchernumber: rec.vouchernumber,
        date: rec.date,
        vchtype: rec.metadata?.vchtype,
        type: rec.metadata?.type,
        allledgerentries: rec?.allledgerentries
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
