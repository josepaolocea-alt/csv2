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
assert.match(html, /\.premium-select-menu\s*\{[\s\S]*?position:\s*fixed;[\s\S]*?backdrop-filter:\s*blur\(14px\)/, 'opened dropdowns should use the app-rendered floating menu');
assert.match(html, /function enhancePremiumSelect\(select\)/, 'native selects should be enhanced through one shared component');
assert.match(html, /select\.setAttribute\('aria-hidden', 'true'\)/, 'the hidden native select should not duplicate the accessible custom control');
assert.match(html, /state\.select\.dispatchEvent\(new Event\('change', \{ bubbles:true \}\)\)/, 'custom option selection should preserve existing change handlers');
assert.match(html, /new MutationObserver\(mutations =>/, 'dynamically generated dropdowns should be enhanced automatically');
assert.match(html, /initPremiumSelects\(\);\s*let _appInitialized/, 'premium dropdowns should initialize before the auth-gated app boot');
assert.match(html, /premiumSelectMoveFocus/, 'the custom option menu should support keyboard navigation');

console.log('Premium dropdown tests passed');
