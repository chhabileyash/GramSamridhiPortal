const fs = require('fs');
let data = fs.readFileSync('app/page.tsx', 'utf8');

const replacements = [
  ['<div className="max-w-300 mx-auto flex justify-between items-center px-4">', '<div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4 md:gap-0">'],
  ['<div className="flex items-center space-x-4">', '<div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-left">'],
  ['<div className="flex items-center space-x-6 text-sm">', '<div className="flex flex-wrap justify-center items-center gap-4 text-sm">'],
  ['<div className="max-w-300 mx-auto flex items-center justify-between px-4">', '<div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between px-4 overflow-x-auto gap-4 py-2 lg:py-0 w-full whitespace-nowrap">'],
  ['<ul className="flex items-center m-0 p-0 list-none divide-x divide-gray-200">', '<ul className="flex items-center m-0 p-0 list-none divide-x divide-gray-200 shrink-0">'],
  ['<form\\n              action="https://www.google.com/search"\\n              method="GET"\\n              target="_blank"\\n              className="relative w-64"\\n            >', '<form\\n              action="https://www.google.com/search"\\n              method="GET"\\n              target="_blank"\\n              className="relative w-full lg:w-64 max-w-sm mb-2 lg:mb-0 shrink-0"\\n            >'],
  ['<div className="max-w-[1200px] mx-auto px-4 flex items-center space-x-3 text-sm">', '<div className="max-w-[1200px] mx-auto px-4 flex flex-col sm:flex-row justify-center sm:justify-start items-center space-y-2 sm:space-y-0 sm:space-x-3 text-sm text-center sm:text-left">'],
  ['<div className="max-w-300 mx-auto px-4 relative z-10 grid grid-cols-12 h-full items-center">', '<div className="max-w-[1200px] mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-12 h-full items-center">'],
  ['<div className="col-span-8 md:col-span-7 pl-8">', '<div className="col-span-1 md:col-span-8 lg:col-span-7 text-center md:text-left pl-0 md:pl-8 pt-10 md:pt-0">'],
  ['<div className="col-span-4 md:col-span-5 flex justify-end items-end h-full"></div>', '<div className="hidden md:flex col-span-4 md:col-span-5 justify-end items-end h-full"></div>'],
  ['<div className="grid grid-cols-4 gap-6">', '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">'],
  ['<div className="max-w-300 mx-auto px-4">', '<div className="max-w-[1200px] mx-auto px-4">'],
  ['<div className="grid grid-cols-12 gap-8 mb-10 items-stretch">', '<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-stretch">'],
  ['<div className="col-span-8 flex flex-col h-full">', '<div className="col-span-1 lg:col-span-8 flex flex-col h-full">'],
  ['<div className="col-span-4 flex flex-col h-full">', '<div className="col-span-1 lg:col-span-4 flex flex-col h-full mt-8 lg:mt-0">'],
  ['<div className="grid grid-cols-3 gap-6 flex-grow">', '<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-grow">'],
  ['<div className="grid grid-cols-12 gap-8 items-stretch">', '<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">'],
  ['<div className="grid grid-cols-4 gap-8 mb-10">', '<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">'],
];

for (const [oldStr, newStr] of replacements) {
    if(oldStr.includes('\\n')) {
       // do a regex replace if we have to deal with multiline
       const regex = new RegExp(oldStr.replace(/\n/g, '\\n'), 'g');
       data = data.replace(oldStr.replace(/\\n/g, '\n'), newStr.replace(/\\n/g, '\n'));
    } else {
       data = data.replaceAll(oldStr, newStr);
    }
}

// One more check to replace any missed "max-w-300"
data = data.replaceAll('max-w-300', 'max-w-[1200px]');

fs.writeFileSync('app/page.tsx', data);
console.log("Responsive grid added successfully.");
