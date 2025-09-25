import { describe, expect, it } from 'vitest';
import { validatePassport } from '../src/domain/passport/validatePassport';

describe('validatePassport', () => {
  const samples: Record<string, string> = {
    USA: 'A12345678',
    Canada: 'AB123456',
    Ireland: 'AA1234567',
    Japan: 'AB1234567',
  };

  Object.entries(samples).forEach(([country, passport]) => {
    it(`accepts a valid passport format for ${country}`, () => {
      expect(validatePassport(passport, country)).toBe(true);
    });
  });

  it('rejects blank passport numbers', () => {
    expect(validatePassport('', 'USA')).toBe(false);
  });

  it('rejects passports with invalid length', () => {
    expect(validatePassport('A1234567', 'USA')).toBe(false);
  });

  it('rejects passports with invalid letters in numeric positions', () => {
    expect(validatePassport('AB2345678', 'USA')).toBe(false);
  });

  it('rejects passports with digits in letter-only positions', () => {
    expect(validatePassport('1B123456', 'Canada')).toBe(false);
  });

  it('rejects passports for unsupported countries', () => {
    expect(validatePassport('AA1234567', 'Spain')).toBe(false);
  });
});
