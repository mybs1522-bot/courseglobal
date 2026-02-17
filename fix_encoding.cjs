const fs = require('fs');
const filePath = process.argv[2] || 'pages/LandingPage.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Windows-1252 byte-to-unicode mapping for 0x80-0x9F range
const w = {
    0x80: '\u20AC', 0x82: '\u201A', 0x83: '\u0192', 0x84: '\u201E',
    0x85: '\u2026', 0x86: '\u2020', 0x87: '\u2021', 0x88: '\u02C6',
    0x89: '\u2030', 0x8A: '\u0160', 0x8B: '\u2039', 0x8C: '\u0152',
    0x8E: '\u017D', 0x91: '\u2018', 0x92: '\u2019', 0x93: '\u201C',
    0x94: '\u201D', 0x95: '\u2022', 0x96: '\u2013', 0x97: '\u2014',
    0x98: '\u02DC', 0x99: '\u2122', 0x9A: '\u0161', 0x9B: '\u203A',
    0x9C: '\u0153', 0x9E: '\u017E', 0x9F: '\u0178'
};

// Given a correct Unicode char, construct its mojibake (double-encoded) form
function mojibake(char) {
    const buf = Buffer.from(char, 'utf8');
    let r = '';
    for (const b of buf) {
        r += (w[b] !== undefined) ? w[b] : String.fromCharCode(b);
    }
    return r;
}

// All characters that need fixing
const chars = [
    '\u2014', '\u2013', '\u2192', '\u2605', '\u23F3', '\u23F0',
    '\u2022', '\u2026', '\u2500', '\u2550', '\u00D7', '\u00E3',
    '\u00E9', '\u{1F4B0}', '\u{1F60E}'
];

let total = 0;
for (const ch of chars) {
    const bad = mojibake(ch);
    const n = content.split(bad).length - 1;
    if (n > 0) {
        content = content.split(bad).join(ch);
        total += n;
        console.log('Fixed ' + n + 'x ' + ch + ' (U+' + ch.codePointAt(0).toString(16).toUpperCase() + ')');
    }
}

console.log('Total fixes: ' + total);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Saved: ' + filePath);
