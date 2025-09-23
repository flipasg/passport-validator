import { passportFormats } from '../constants';
import { validatePassport } from '../src/utils/PassportValidator';
describe('PassporNumberValidator', () => {
  test('should validate correclty passport from USA', () => {
    const passport = 'U12345678';

    expect(validatePassport(passport, 'USA')).toBe(true);
  });

  test('should validate correclty passport from Canada', () => {
    const passport = 'CA123456';

    expect(validatePassport(passport, 'Canada')).toBe(true);
  });

  test('should validate correclty passport from Ireland', () => {
    const passport = 'C91234567';

    expect(validatePassport(passport, 'Ireland')).toBe(true);
  });

  test('should validate correclty passport from Ireland', () => {
    const passport = 'JA1234567';

    expect(validatePassport(passport, 'Ireland')).toBe(true);
  });

  test('should not validate with different lengths passport from Ireland', () => {
    const passport = 'JA12345678';

    expect(validatePassport(passport, 'Ireland')).toBe(false);
  });
});
