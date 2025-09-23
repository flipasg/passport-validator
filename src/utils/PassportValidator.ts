import { passportFormats } from '../constants';

const isAlphanumeric = (char: string) => /[a-zA-Z0-9]/i.test(char);
const isNumeric = (char: string) => /^\d+$/i.test(char);
const isLetter = (char: string) => /[a-zA-Z]/i.test(char);

const formatMapping: Record<string, Function> = {
  A: isAlphanumeric,
  L: isLetter,
  D: isNumeric,
};

export const validatePassport = (
  passportNumber: string,
  countryName: string
) => {
  const format = passportFormats[countryName] as string;

  if (passportNumber.length !== format.length) {
    return false;
  }

  for (let index = 0; index < format.length; index++) {
    const letterFormat = format[index] as string;
    const isValidChar = formatMapping[letterFormat]?.(passportNumber[index]);
    if (!isValidChar) {
      return false;
    }
  }

  return true;
};
