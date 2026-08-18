const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const nativeSelectCount = (html.match(/<select\b/g) || []).length;

assert.ok(nativeSelectCount >= 30, 'the app should contain the expected native dropdown fields');
assert.match(html, /select:not\(\[multiple\]\)\s*\{[\s\S]*?appearance:\s*none;[\s\S]*?background-image:/, 'all single-select dropdowns should use the premium custom-chevron treatment');
assert.match(html, /select:not\(\[multiple\]\):hover:not\(:disabled\)/, 'premium dropdowns should have a hover state');
assert.match(html, /select:not\(\[multiple\]\):focus-visible/, 'premium dropdowns should have a keyboard focus state');
assert.match(html, /select:not\(\[multiple\]\):disabled/, 'premium dropdowns should have a disabled state');
assert.match(html, /select option:checked\s*\{\s*background:\s*var\(--accent-soft\)/, 'selected options should use the app accent treatment');
assert.match(html, /#sms-bulk-panel \.bulk-field select \{ padding: 0 30px 0 8px; \}/, 'bulk-edit dropdowns should reserve space for the custom chevron');

console.log('Premium dropdown tests passed');
