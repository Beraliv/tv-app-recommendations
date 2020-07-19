import { isNegativeFiniteNumber } from '.';

describe('isNegativeFiniteNumber', () => {
  it(`should return false for non-number`, () => {
    expect(isNegativeFiniteNumber('')).toBeFalsy();
    expect(isNegativeFiniteNumber({})).toBeFalsy();
    expect(isNegativeFiniteNumber([])).toBeFalsy();
    expect(isNegativeFiniteNumber(new Date())).toBeFalsy();
    expect(isNegativeFiniteNumber(false)).toBeFalsy();
    expect(isNegativeFiniteNumber(undefined)).toBeFalsy();
    expect(isNegativeFiniteNumber(null)).toBeFalsy();
  });

  it(`should return false for infinite number and NaN`, () => {
    expect(isNegativeFiniteNumber(Infinity)).toBeFalsy();
    expect(isNegativeFiniteNumber(-Infinity)).toBeFalsy();
    expect(isNegativeFiniteNumber(NaN)).toBeFalsy();
  });

  it(`should return false for 0 and positive numbers`, () => {
    expect(isNegativeFiniteNumber(-0)).toBeFalsy();
    expect(isNegativeFiniteNumber(+0)).toBeFalsy();
    expect(isNegativeFiniteNumber(1)).toBeFalsy();
    expect(isNegativeFiniteNumber(100)).toBeFalsy();
  });

  it(`should return true for negative numbers`, () => {
    expect(isNegativeFiniteNumber(-100)).toBeTruthy();
  });
});