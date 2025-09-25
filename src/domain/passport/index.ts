import { passportFormats } from './passportFormats';
import type { PassportCountry } from './passportFormats';

export { passportFormats } from './passportFormats';
export type { PassportCountry } from './passportFormats';
export { validatePassport } from './validatePassport';

export const passportCountries = Object.keys(passportFormats) as PassportCountry[];
