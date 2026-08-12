/**
 * filter.js — filter records by metadata.vchtype, optionally pick root keys
 *
 * Usage:
 *   node filter.js <vchtype> [limit] [--fields key1,key2,...]
 *
 * Examples:
 *   node filter.js Sales
 *   node filter.js Sales/Cr Mani 5
 *   node filter.js Bank Receipt 10 --fields date,vouchernumber,partyledgername
 *   node filter.js Sales --fields date,vouchernumber,partyledgername,allinventoryentries
 */

import { streamRecords } from './tallyStream.js';

// ── Parse args ──────────────────────────────────────────────────────────────
let rawArgs = process.argv.slice(2);

// Extract --fields key1,key2 (anywhere in args)
let fields = null;
const fi = rawArgs.findIndex(a => a === '--fields' || a === '-f');
if (fi !== -1 && rawArgs[fi + 1]) {
    fields = rawArgs[fi + 1].split(',').map(s => s.trim()).filter(Boolean);
    rawArgs = rawArgs.filter((_, i) => i !== fi && i !== fi + 1);
}

if (!rawArgs.length) {
    console.error('Usage: node filter.js <vchtype> [limit] [--fields key1,key2]');
    console.error('  e.g. node filter.js Sales');
    console.error('  e.g. node filter.js Sales/Cr Mani 10');
    console.error('  e.g. node filter.js Bank Receipt 5 --fields date,vouchernumber,partyledgername');
    process.exit(1);
}

// If the last remaining arg is a number, treat it as the limit
const lastArg = rawArgs[rawArgs.length - 1];
const hasLimit = /^\d+$/.test(lastArg) && rawArgs.length > 1;
const limit    = hasLimit ? parseInt(lastArg, 10) : 0;
const vchtype  = hasLimit ? rawArgs.slice(0, -1).join(' ') : rawArgs.join(' ');

// ── Run ─────────────────────────────────────────────────────────────────────
console.log(`\nFiltering: vchtype = "${vchtype}"` +
    (limit  ? `  max ${limit}`            : '') +
    (fields ? `  fields: [${fields.join(', ')}]` : '') + '\n');

let matched = 0;

await streamRecords((rec) => {
    if (rec?.metadata?.vchtype !== vchtype) return;

    matched++;
    // Pick only requested fields (or full record if no --fields given)
    const out = fields
        ? Object.fromEntries(fields.map(k => [k, rec[k]]))
        : rec;

    console.log(`${'═'.repeat(50)}`);
    console.log(`  MATCH #${matched}`);
    console.log(`${'═'.repeat(50)}`);
    console.log(JSON.stringify(out, null, 2));

    if (limit > 0 && matched >= limit) return false;
});

console.log(`\nTotal matched: ${matched}` +
    (limit && matched >= limit ? ` (limited to ${limit})` : '') + '\n');
