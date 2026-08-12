import { createReadStream } from 'fs';

// Counts items inside "tallymessage" array by streaming the file.
// File structure: { "tallymessage": [ {...}, {...}, ... ] }
// Works even for very large files (1GB+) that can't fit in a string.
function getArrayCount() {
    return new Promise((resolve, reject) => {
        const stream = createReadStream('../Data/purchases.json', { encoding: 'utf8' });

        let count = 0;
        let braceDepth = 0;     // tracks {} nesting depth
        let bracketDepth = 0;   // tracks [] nesting depth
        let inString = false;   // are we inside a JSON string?
        let escape = false;     // previous char was backslash inside a string
        let inTargetArray = false; // are we inside tallymessage array?

        stream.on('data', (chunk) => {
            for (const ch of chunk) {
                if (escape) { escape = false; continue; }
                if (ch === '\\' && inString) { escape = true; continue; }
                if (ch === '"') { inString = !inString; continue; }
                if (inString) continue;

                if (ch === '{') {
                    braceDepth++;
                    // Each top-level object inside tallymessage starts here
                    if (inTargetArray && bracketDepth === 1) count++;
                } else if (ch === '}') {
                    braceDepth--;
                    if (braceDepth === 0) inTargetArray = false;
                } else if (ch === '[') {
                    bracketDepth++;
                    // tallymessage array starts at bracketDepth 1, braceDepth 1
                    if (bracketDepth === 1 && braceDepth === 1) inTargetArray = true;
                } else if (ch === ']') {
                    if (bracketDepth === 1) inTargetArray = false;
                    bracketDepth--;
                }
            }
        });

        stream.on('end', () => {
            console.log(`Total items in tallymessage array: ${count}`);
            resolve(count);
        });

        stream.on('error', (err) => {
            console.error('Error reading file:', err);
            reject(err);
        });
    });
}

getArrayCount();
