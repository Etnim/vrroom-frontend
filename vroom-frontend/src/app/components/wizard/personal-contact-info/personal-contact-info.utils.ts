export function extractBirthDate(asmensKodas: string): string {
  // Extract the birth date digits from the personal code
  const birthDateDigits = asmensKodas.slice(1, 7);

  // Extract the year, month, and day from the birth date digits
  const year = parseInt(birthDateDigits.slice(0, 2), 10);
  const month = parseInt(birthDateDigits.slice(2, 4), 10);
  const day = parseInt(birthDateDigits.slice(4, 6), 10);

  // Determine the century based on the first digit of the personal code
  const centuryDigit = parseInt(asmensKodas.charAt(0), 10);
  let century;

  if (centuryDigit === 1 || centuryDigit === 2) {
    century = 1800;
  } else if (centuryDigit === 3 || centuryDigit === 4) {
    century = 1900;
  } else if (centuryDigit === 5 || centuryDigit === 6) {
    century = 2000;
  } else {
    throw new Error('Invalid personal code');
  }

  // Calculate the full year
  const fullYear = century + year;

  // Format the birth date as "YYYY-MM-DD"
  const formattedDate = `${fullYear}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}`;

  return formattedDate;
}

export const PHONE_REGX = new RegExp('^\\+3706\\d{7}$');

export const PERSONAL_CODE_REGX = new RegExp(
  '^[3-6][0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])\\d{4}$'
);

export const ENGLISH_CHARACTER_REGX = new RegExp('^[a-zA-Z\\s]+$');
