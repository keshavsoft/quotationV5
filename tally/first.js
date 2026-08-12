/**
 * first.js — print the first N records from purchases.json
 *
 * Usage:
 *   node first.js          → first 1 record
 *   node first.js 10       → first 10 records
 */

import { firstRecords } from './tallyStream.js';

const n = parseInt(process.argv[2] ?? '1', 10);
if (isNaN(n) || n < 1) {
    console.error('Usage: node first.js [count]   e.g.  node first.js 10');
    process.exit(1);
}

console.log(`Fetching first ${n} record(s)...\n`);
const records = await firstRecords(n);

records.forEach((rec, i) => {
    console.log(`${'═'.repeat(50)}`);
    console.log(`  RECORD #${i + 1}`);
    console.log(`${'═'.repeat(50)}`);
    console.log(JSON.stringify(rec, null, 2));
});

console.log(`\nShowed ${records.length} record(s).`);
