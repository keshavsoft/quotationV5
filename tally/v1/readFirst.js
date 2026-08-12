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

// ── 2. LAST RECORD: read backwards from EOF in 512KB chunks ───────────────
function getLastRecord() {
    return new Promise((resolve, reject) => {
        const CHUNK = 524288; // 512 KB
        const fileSize = statSync('./purchases.json').size;
        const fd = openSync('./purchases.json', 'r');

        let tail = '';
        let pos = fileSize;

        try {
            while (pos > 0) {
                const readSize = Math.min(CHUNK, pos);
                pos -= readSize;

                const buf = Buffer.alloc(readSize);
                readSync(fd, buf, 0, readSize, pos);
                tail = buf.toString('utf8') + tail;

                // We need to find the tallymessage array opening '['
                const arrayIdx = tail.indexOf('[');
                if (arrayIdx === -1) continue; // haven't read enough yet

                // Scan left→right, track the LAST complete top-level object
                // (depth goes 0→1 at '{' and back to 0 at matching '}')
                let lastStart = -1, lastEnd = -1;
                let depth = 0, inString = false, escape = false;
                let topLevelStart = -1;

                for (let i = arrayIdx + 1; i < tail.length; i++) {
                    const ch = tail[i];
                    if (escape)               { escape = false; continue; }
                    if (ch === '\\' && inString) { escape = true; continue; }
                    if (ch === '"')           { inString = !inString; continue; }
                    if (inString)             { continue; }

                    if (ch === '{') {
                        if (depth === 0) topLevelStart = i; // start of a top-level object
                        depth++;
                    } else if (ch === '}') {
                        depth--;
                        if (depth === 0 && topLevelStart !== -1) {
                            lastStart = topLevelStart; // record every complete top-level object
                            lastEnd   = i;
                            topLevelStart = -1;
                        }
                    }
                }

                // If we found at least one complete top-level object, return the last one
                if (lastStart !== -1 && lastEnd !== -1) {
                    closeSync(fd);
                    resolve(JSON.parse(tail.slice(lastStart, lastEnd + 1)));
                    return;
                }
                // No complete top-level object yet — read more from the end
            }
        } catch (e) {
            closeSync(fd);
            reject(e);
        }
        closeSync(fd);
        reject(new Error('Last record not found'));
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
