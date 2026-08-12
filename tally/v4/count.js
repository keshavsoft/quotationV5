/**
 * count.js — count total records in purchases.json
 *
 * Usage:
 *   node count.js
 */

import { countRecords } from './tallyStream.js';

console.log('Counting records...');
const n = await countRecords();
console.log(`\nTotal records: ${n}`);
