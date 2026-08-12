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

        // persistent state across chunks
        let buf          = '';       // rolling buffer
        let arrayFound   = false;    // have we passed the opening '[' ?
        let depth        = 0;        // brace depth (relative to inside the array)
        let inStr        = false;
        let esc          = false;
        let objStart     = -1;       // buf index where current top-level object started
        let recIdx       = 0;        // count of records emitted
        let stopped      = false;

        stream.on('data', (chunk) => {
            if (stopped) return;
            buf += chunk;

            // ── locate the opening '[' of tallymessage array (once) ─────────
            if (!arrayFound) {
                const bracket = buf.indexOf('[');
                if (bracket === -1) { buf = ''; return; }
                buf        = buf.slice(bracket + 1);
                arrayFound = true;
                objStart   = -1;
            }

            // ── scan for complete top-level objects ──────────────────────────
            // We gather {start, end} pairs of complete objects,
            // then parse them AFTER the loop (avoids in-loop buffer mutation).
            const completed = [];   // [{s, e}] positions of complete objects in buf

            let i = 0;
            while (i < buf.length) {
                const ch = buf[i];

                // string / escape tracking
                if (esc)              { esc = false;   i++; continue; }
                if (ch === '\\' && inStr) { esc = true; i++; continue; }
                if (ch === '"')       { inStr = !inStr; i++; continue; }
                if (inStr)            { i++; continue; }

                // structural chars
                if (ch === '{') {
                    if (depth === 0) objStart = i;   // top-level object start
                    depth++;
                } else if (ch === '}') {
                    depth--;
                    if (depth === 0 && objStart !== -1) {
                        completed.push({ s: objStart, e: i });
                        objStart = -1;
                    }
                }
                i++;
            }

            // ── parse completed objects (in order) ──────────────────────────
            let trimTo = -1;        // last position we can safely trim up to
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
                    // surface parse errors with context
                    reject(new Error(
                        `JSON parse error at record ${recIdx}: ${err.message}\n` +
                        `Snippet: ${buf.slice(s, s + 200)}`
                    ));
                    stopped = true;
                    stream.destroy();
                    return;
                }
            }

            // ── trim the buffer ──────────────────────────────────────────────
            if (trimTo > 0 && !stopped) {
                if (objStart !== -1) {
                    // An object is in progress starting at objStart.
                    // trimTo must be <= objStart (we only trim up to a completed object boundary).
                    // After trim, the in-progress object's new start position is:
                    objStart = objStart - trimTo;
                    buf = buf.slice(trimTo);
                } else if (depth === 0) {
                    // No in-progress object — safe to discard everything up to trimTo
                    buf = buf.slice(trimTo);
                    // Keep just the last char for boundary safety
                    if (buf.length > 1) buf = buf.slice(-1);
                }
            } else if (trimTo === -1 && objStart === -1 && depth === 0 && !stopped) {
                // No completed objects and no object in progress — drop all but last char
                if (buf.length > 1) buf = buf.slice(-1);
            }
            // If objStart !== -1 but trimTo === -1: object spans multiple chunks — keep buf growing.
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
