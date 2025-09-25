import { passportFormats } from './passportFormats';
import type { PassportCountry } from './passportFormats';
import { PassportValidator } from './PassportValidator';

export { passportFormats } from './passportFormats';
export type { PassportCountry } from './passportFormats';
export { PassportValidator } from './PassportValidator';

export const passportCountries = Object.keys(passportFormats) as PassportCountry[];
export const passportValidator = new PassportValidator();
