const fs = require('fs');
let data = fs.readFileSync('app/page.tsx', 'utf8');
data = data.replace(/className="relative w-64"/g, 'className="relative w-full lg:w-64 max-w-sm mb-2 lg:mb-0 shrink-0 mt-4 lg:mt-0"');
fs.writeFileSync('app/page.tsx', data);
