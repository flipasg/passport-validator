import { passportFormats, type PassportCountry, type PassportFormatToken } from './passportFormats';

type FormatValidator = (char: string) => boolean;

const validators: Record<PassportFormatToken, FormatValidator> = {
  A: (char) => /^[a-zA-Z0-9]$/.test(char),
  L: (char) => /^[a-zA-Z]$/.test(char),
  D: (char) => /^\d$/.test(char),
};

const hasCountry = (
  formats: Record<PassportCountry, string>,
  countryName: string
): countryName is PassportCountry => Object.prototype.hasOwnProperty.call(formats, countryName);

export class PassportValidator {
  private readonly formats: Record<PassportCountry, string>;

  constructor(formats: Record<PassportCountry, string> = passportFormats) {
    this.formats = formats;
  }

  validate(passportNumber: string, countryName: string): boolean {
    if (!hasCountry(this.formats, countryName)) {
      return false;
    }

    if (typeof passportNumber !== 'string') {
      return false;
    }

    const normalizedPassport = passportNumber.trim();

    if (normalizedPassport.length === 0) {
      return false;
    }

    const format = this.formats[countryName];

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
  }

  getSupportedCountries(): PassportCountry[] {
    return Object.keys(this.formats) as PassportCountry[];
  }

  getFormat(country: PassportCountry): string {
    return this.formats[country];
  }
}
