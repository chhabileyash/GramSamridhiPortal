const fs = require('fs');
let data = fs.readFileSync('app/auth/signup/page.tsx', 'utf8');

const replacements = {
  'bg-primary': 'bg-[#1F4E79]',
  'text-primary': 'text-[#1F4E79]',
  'border-primary': 'border-[#1F4E79]',
  'group-focus-within:text-primary': 'group-focus-within:text-[#1F4E79]',
  'group-hover:text-primary': 'group-hover:text-[#1F4E79]',
  'text-accent': 'text-[#F28C28]',
  'bg-accent': 'bg-[#F28C28]',
  'border-accent': 'border-[#F28C28]',
  'accent-accent': 'accent-[#F28C28]',
  'focus:border-accent': 'focus:border-[#F28C28]',
  'focus:ring-accent': 'focus:ring-[#F28C28]',
  'hover:text-accent': 'hover:text-[#F28C28]',
  'hover:bg-accent': 'hover:brightness-110',
  'bg-surface': 'bg-white',
  'text-\\[var\\(--color-text-secondary\\)\\]': 'text-gray-600',
  'text-\\[var\\(--color-text-muted\\)\\]': 'text-gray-400',
  'border-border': 'border-gray-200',
  'text-green-950': 'text-[#1F4E79]',
  'text-green-50': 'text-white/90',
  'bg-green-50': 'bg-gray-50',
  'border-green-100': 'border-gray-200',
  'group bg-\\[#1F4E79\\] shadow-\\[0px_2px_6px_rgba\\(0,0,0,0\\\\.08\\)\\] text-white': 'group bg-white shadow-sm text-gray-700',
  '<footer className="w-full py-4 bg-\\[#1F4E79\\] border-t-4 border-\\[#F28C28\\] text-center">': '<footer className="w-full py-4 bg-[#2F5E3D] text-center">'
};

for (let [k, v] of Object.entries(replacements)) {
  data = data.replace(new RegExp(k, 'g'), v);
}

fs.writeFileSync('app/auth/signup/page.tsx', data);
