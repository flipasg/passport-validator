import { passportFormats, type PassportCountry, type PassportFormatToken } from './passportFormats';

type FormatValidator = (char: string) => boolean;

const validators: Record<PassportFormatToken, FormatValidator> = {
  A: (char) => /^[a-zA-Z0-9]$/.test(char),
  L: (char) => /^[a-zA-Z]$/.test(char),
  D: (char) => /^\d$/.test(char),
};

const isSupportedCountry = (countryName: string): countryName is PassportCountry =>
  Object.prototype.hasOwnProperty.call(passportFormats, countryName);

export const validatePassport = (passportNumber: string, countryName: string): boolean => {
  if (!isSupportedCountry(countryName)) {
    return false;
  }

  if (typeof passportNumber !== 'string') {
    return false;
  }

  const normalizedPassport = passportNumber.trim();

  if (normalizedPassport.length === 0) {
    return false;
  }

  const format = passportFormats[countryName];

  if (normalizedPassport.length !== format.length) {
    return false;
  }

  const tokens = [...format] as PassportFormatToken[];

  return tokens.every((token, index) => {
    const validator = validators[token];

    if (!validator) {
      return false;
    }

    const char = normalizedPassport.charAt(index);
    return char.length > 0 && validator(char);
  });
};
