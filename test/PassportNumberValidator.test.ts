import { describe, expect, it } from 'vitest';
import { PassportValidator } from '../src/domain/passport/PassportValidator';

describe('PassportValidator', () => {
  const validator = new PassportValidator();
  const samples: Record<string, string> = {
    USA: 'A12345678',
    Canada: 'AB123456',
    Ireland: 'AA1234567',
    Japan: 'AB1234567',
  };

  Object.entries(samples).forEach(([country, passport]) => {
    it(`accepts a valid passport format for ${country}`, () => {
      expect(validator.validate(passport, country)).toBe(true);
    });
  });

  it('rejects blank passport numbers', () => {
    expect(validator.validate('', 'USA')).toBe(false);
  });

  it('rejects passports with invalid length', () => {
    expect(validator.validate('A1234567', 'USA')).toBe(false);
  });

  it('rejects passports with invalid letters in numeric positions', () => {
    expect(validator.validate('AB2345678', 'USA')).toBe(false);
  });

  it('rejects passports with digits in letter-only positions', () => {
    expect(validator.validate('1B123456', 'Canada')).toBe(false);
  });

  it('rejects passports for unsupported countries', () => {
    expect(validator.validate('AA1234567', 'Spain')).toBe(false);
  });
});
