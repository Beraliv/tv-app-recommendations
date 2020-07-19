import { isPositiveFiniteNumber } from './';

describe('isPositiveFiniteNumber', () => {
  it(`should return false for non-number`, () => {
    expect(isPositiveFiniteNumber('')).toBeFalsy();
    expect(isPositiveFiniteNumber({})).toBeFalsy();
    expect(isPositiveFiniteNumber([])).toBeFalsy();
    expect(isPositiveFiniteNumber(new Date())).toBeFalsy();
    expect(isPositiveFiniteNumber(false)).toBeFalsy();
    expect(isPositiveFiniteNumber(undefined)).toBeFalsy();
    expect(isPositiveFiniteNumber(null)).toBeFalsy();
  });

  it(`should return false for infinite number and NaN`, () => {
    expect(isPositiveFiniteNumber(Infinity)).toBeFalsy();
    expect(isPositiveFiniteNumber(-Infinity)).toBeFalsy();
    expect(isPositiveFiniteNumber(NaN)).toBeFalsy();
  });

  it(`should return false for non-positive numbers`, () => {
    expect(isPositiveFiniteNumber(-100)).toBeFalsy();
    expect(isPositiveFiniteNumber(-0)).toBeFalsy();
    expect(isPositiveFiniteNumber(+0)).toBeFalsy();
  });

  it(`should return true for positive numbers`, () => {
    expect(isPositiveFiniteNumber(1)).toBeTruthy();
    expect(isPositiveFiniteNumber(100)).toBeTruthy();
  });
});