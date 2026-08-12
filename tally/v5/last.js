/**
 * last.js — print the last N records from purchases.json
 *
 * Usage:
 *   node last.js           → last 1 record
 *   node last.js 5         → last 5 records
 *
 * Note: streams the full file but only keeps a rolling window of N records,
 * so memory usage stays low regardless of file size.
 */

import { lastRecords } from './tallyStream.js';

const n = parseInt(process.argv[2] ?? '1', 10);
if (isNaN(n) || n < 1) {
    console.error('Usage: node last.js [count]   e.g.  node last.js 5');
    process.exit(1);
}

console.log(`Fetching last ${n} record(s)... (streaming full file)\n`);
const records = await lastRecords(n);

records.forEach((rec, i) => {
    const label = records.length - i;
    console.log(`${'═'.repeat(50)}`);
    console.log(`  LAST RECORD #${label} (from end)`);
    console.log(`${'═'.repeat(50)}`);
    console.log(JSON.stringify(rec, null, 2));
});

console.log(`\nShowed ${records.length} record(s).`);
