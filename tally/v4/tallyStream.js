/**
 * tallyStream.js — shared streaming helpers for large Tally JSON files.
 *
 * File structure expected:
 *   { "tallymessage": [ {...}, {...}, ... ] }
 *
 * All functions work on files of any size without loading them into memory.
 */

import { createReadStream } from 'fs';

const FILE = new URL('../Data/purchases.json', import.meta.url)
    .pathname.replace(/^\/([A-Z]:)/i, '$1');

// ── Core: stream records, call onRecord(obj, zeroBasedIndex) for each ──────
// Return false from onRecord to stop early.
export function streamRecords(onRecord) {
    return new Promise((resolve, reject) => {
        const stream = createReadStream(FILE, { encoding: 'utf8' });

        // Accumulation buffer and scan cursor
        let buf        = '';
        let scanPos    = 0;     // position we've scanned up to in buf

        // Parser state (persists across chunks — we never rescan old data)
        let arrayFound = false;
        let depth      = 0;
        let inStr      = false;
        let esc        = false;
        let objStart   = -1;    // buf index where current top-level object started
        let recIdx     = 0;
        let stopped    = false;

        // Completed objects found during this data event
        let completed  = [];    // [{s, e}]

        function scan() {
            while (scanPos < buf.length && !stopped) {
                const ch = buf[scanPos];

                // string / escape tracking
                if (esc)               { esc = false;  scanPos++; continue; }
                if (ch === '\\' && inStr) { esc = true; scanPos++; continue; }
                if (ch === '"')        { inStr = !inStr; scanPos++; continue; }
                if (inStr)             { scanPos++; continue; }

                // structural chars (only reached when NOT inside a string)
                if (ch === '{') {
                    if (depth === 0) objStart = scanPos;
                    depth++;
                } else if (ch === '}') {
                    depth--;
                    if (depth === 0 && objStart !== -1) {
                        completed.push({ s: objStart, e: scanPos });
                        objStart = -1;
                    }
                }
                scanPos++;
            }
        }

        stream.on('data', (chunk) => {
            if (stopped) return;

            if (!arrayFound) {
                // Buffer until we see the opening '[' of tallymessage array
                buf += chunk;
                const bracket = buf.indexOf('[');
                if (bracket === -1) { buf = ''; return; }
                // Discard everything up to and including '['
                buf        = buf.slice(bracket + 1);
                scanPos    = 0;
                arrayFound = true;
            } else {
                // Append new chunk; scanPos already points past old content
                buf += chunk;
            }

            completed = [];
            scan();     // scan only the new (unscanned) portion

            // Parse completed objects
            let trimTo = -1;
            for (const { s, e } of completed) {
                if (stopped) break;
                try {
                    const obj = JSON.parse(buf.slice(s, e + 1));
                    const keepGoing = onRecord(obj, recIdx++);
                    trimTo = e + 1;
                    if (keepGoing === false) {
                        stopped = true;
                        stream.destroy();
                    }
                } catch (err) {
                    reject(new Error(
                        `JSON parse error at record ${recIdx}: ${err.message}\n` +
                        `Snippet (first 300 chars): ${buf.slice(s, s + 300)}`
                    ));
                    stopped = true;
                    stream.destroy();
                    return;
                }
            }

            // Trim buffer up to the last completed object
            if (!stopped && trimTo > 0) {
                buf     = buf.slice(trimTo);
                scanPos = scanPos - trimTo;   // adjust scan cursor
                if (objStart !== -1) objStart -= trimTo;
            }
        });

        stream.on('close', () => resolve(recIdx));
        stream.on('end',   () => resolve(recIdx));
        stream.on('error', reject);
    });
}

// ── Count all records ───────────────────────────────────────────────────────
export function countRecords() {
    let n = 0;
    return streamRecords(() => { n++; }).then(() => n);
}

// ── Get first N records ─────────────────────────────────────────────────────
export function firstRecords(n = 1) {
    const results = [];
    return streamRecords((obj) => {
        results.push(obj);
        return results.length < n;      // return false when we have enough
    }).then(() => results);
}

// ── Get last N records (rolling window, streams full file) ──────────────────
export function lastRecords(n = 1) {
    const win = [];
    return streamRecords((obj) => {
        win.push(obj);
        if (win.length > n) win.shift(); // drop oldest, keep only last N
    }).then(() => win);
}
