export function numberToAlphabet(num: number | string): string {
  let result = "";
  const numericValue = typeof num === "string" ? Number(num) : num;

  if (Number.isNaN(numericValue)) {
    return "";
  }

  const str = String(numericValue);

  for (let i = 0; i < str.length; i++) {
    const digit = Number(str[i]);
    if (digit === 0) continue; // skip 0 if needed
    result += String.fromCharCode(65 + digit - 1);
  }

  return result;
}
