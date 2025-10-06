


export function normalizeDateInput (value:string,maxYear:number,minYear:number){
  let lastIndex = value.length - 1;
  
   if(value.length>10) return value = value.slice(0,-1)
   let digits = value.split('').map(Number);

// --- Ajuste para o dia ---
if (lastIndex === 0 && digits[0] > 3) {
  digits[0] = digits[0] / 10;
}

if (lastIndex === 1) {
  const day = Number(digits.slice(0, 2).join(''));

  if (day === 0) {
    digits[0] = 0; 
    digits[1] = 1; 
  }

  if (day > 31) {
    digits[0] = 3; 
    digits[1] = 1;
  }
}

// --- Ajuste para 1º dígito do mês ---
if ((lastIndex === 2 || lastIndex === 3) && digits[2] > 1) {
  digits[2] = digits[2] / 10;
}

// --- Ajuste para mês ---
if (lastIndex === 4) {
  const month = Number(digits.slice(3, 5).join(''));

  if (month === 0) {
    digits[3] = 0; 
    digits[4] = 1;
  }

  if (month > 12) {
    digits[3] = 1;
    digits[4] = 2;
  }
}

// --- Ajustes para ano ---
if (lastIndex === 5 || lastIndex === 6) {
  if (isNaN(digits[lastIndex])) {
    lastIndex -= 1;
  }
  if (digits[lastIndex] !== 2) {
    digits[lastIndex] = 2;
  }
}

if (lastIndex === 7) {
  digits[7] = 0;
}

// --- Limite máximo do ano ---
const year = Number(digits.slice(6, 10).join(''));


if (digits.length === 10 && year > maxYear) {
  digits.splice(6, 4, ...String(maxYear).split('').map(Number));
}
if(digits.length===10 && minYear>year){
  digits.splice(6, 4, ...String(minYear).split('').map(Number));
}

const fixed = digits.join('').replace(/NaN/g, "/")
 return fixed
}