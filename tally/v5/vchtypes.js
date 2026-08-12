/**
 * vchtypes.js — distinct metadata.vchtype values and their counts
 *
 * Usage:
 *   node vchtypes.js
 */

import { streamRecords } from './tallyStream.js';

const counts = {};

await streamRecords((rec) => {
    const vchtype = rec?.metadata?.vchtype ?? '(none)';
    counts[vchtype] = (counts[vchtype] ?? 0) + 1;
});

// Sort by count descending
const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

console.log('\n' + '═'.repeat(45));
console.log(`  DISTINCT metadata.vchtype  (${sorted.length} types)`);
console.log('═'.repeat(45));
console.log(`${'vchtype'.padEnd(30)} ${'count'.padStart(10)}`);
console.log('─'.repeat(45));
for (const [type, count] of sorted) {
    console.log(`${type.padEnd(30)} ${String(count).padStart(10)}`);
}
console.log('─'.repeat(45));
const total = sorted.reduce((s, [, c]) => s + c, 0);
console.log(`${'TOTAL'.padEnd(30)} ${String(total).padStart(10)}`);
console.log('═'.repeat(45) + '\n');
