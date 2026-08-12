import { createReadStream, statSync, openSync, readSync, closeSync } from 'fs';

// ── Helper: extract one balanced { ... } object from a string ──────────────
function extractObject(str, startIndex = 0) {
    let depth = 0, inString = false, escape = false;
    for (let i = startIndex; i < str.length; i++) {
        const ch = str[i];
        if (escape)          { escape = false; continue; }
        if (ch === '\\' && inString) { escape = true; continue; }
        if (ch === '"')      { inString = !inString; continue; }
        if (inString)        { continue; }
        if (ch === '{')      { depth++; }
        else if (ch === '}') { depth--; if (depth === 0) return str.slice(startIndex, i + 1); }
    }
    return null;
}

// ── 1. FIRST RECORD: stream until we capture the first complete object ─────
function getFirstRecord() {
    return new Promise((resolve, reject) => {
        const stream = createReadStream('./purchases.json', { encoding: 'utf8' });
        let buffer = '';
        let arrayStarted = false;
        let done = false;

        stream.on('data', (chunk) => {
            if (done) return;
            buffer += chunk;

            if (!arrayStarted) {
                const idx = buffer.indexOf('[');
                if (idx === -1) return;
                buffer = buffer.slice(idx + 1); // skip past opening [
                arrayStarted = true;
            }

            const firstBrace = buffer.indexOf('{');
            if (firstBrace === -1) return;

            const obj = extractObject(buffer, firstBrace);
            if (obj) {
                done = true;
                stream.destroy();
                resolve(JSON.parse(obj));
            }
        });

        stream.on('close', () => { if (!done) reject(new Error('First record not found')); });
        stream.on('error', reject);
    });
}

// ── 2. LAST RECORD: stream forward, capture the last top-level voucher ─────
// We stream the whole file but only keep the most recently completed top-level object.
function getLastRecord() {
    return new Promise((resolve, reject) => {
        const stream = createReadStream('./purchases.json', { encoding: 'utf8' });

        let buffer = '';
        let arrayStarted = false;
        let depth = 0, inString = false, escape = false;
        let topLevelStart = -1;
        let lastCompleteRecord = null; // always overwrite — ends up being the last one

        stream.on('data', (chunk) => {
            buffer += chunk;

            if (!arrayStarted) {
                const idx = buffer.indexOf('[');
                if (idx === -1) { buffer = buffer.slice(-10); return; } // keep a little tail
                buffer = buffer.slice(idx + 1);
                arrayStarted = true;
            }

            let i = 0;
            while (i < buffer.length) {
                const ch = buffer[i];
                if (escape)                { escape = false; i++; continue; }
                if (ch === '\\' && inString) { escape = true;  i++; continue; }
                if (ch === '"')            { inString = !inString; i++; continue; }
                if (inString)              { i++; continue; }

                if (ch === '{') {
                    if (depth === 0) topLevelStart = i;
                    depth++;
                } else if (ch === '}') {
                    depth--;
                    if (depth === 0 && topLevelStart !== -1) {
                        // Complete top-level object — parse and overwrite (last one wins)
                        try {
                            lastCompleteRecord = JSON.parse(buffer.slice(topLevelStart, i + 1));
                        } catch (_) { /* ignore partial/corrupt entries */ }
                        topLevelStart = -1;
                        // Trim processed portion to keep buffer from growing unbounded
                        buffer = buffer.slice(i + 1);
                        i = -1; // restart scan from new buffer start
                    }
                }
                i++;
            }

            // If no top-level object is currently open, trim the buffer
            if (topLevelStart === -1 && depth === 0) {
                buffer = buffer.slice(-1); // keep last char for boundary safety
            }
        });

        stream.on('end', () => {
            if (lastCompleteRecord) resolve(lastCompleteRecord);
            else reject(new Error('Last record not found'));
        });

        stream.on('error', reject);
    });
}


// ── Run both ───────────────────────────────────────────────────────────────
const [first, last] = await Promise.all([getFirstRecord(), getLastRecord()]);

console.log('═══════════════════════════════════════');
console.log('FIRST RECORD:');
console.log('═══════════════════════════════════════');
console.log(JSON.stringify(first, null, 2));

console.log('\n═══════════════════════════════════════');
console.log('LAST RECORD:');
console.log('═══════════════════════════════════════');
console.log(JSON.stringify(last, null, 2));
