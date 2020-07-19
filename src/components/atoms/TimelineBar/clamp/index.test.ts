import { clamp } from './';

describe('clamp', () => {
  it(`should return minimum if value is less than that`, () => {
    expect(clamp(-1, 0, 1)).toBe(0);
    expect(clamp(-Infinity, 0, 1)).toBe(0);
  });

  it(`should return maximum if value is more than that`, () => {
    expect(clamp(2, 0, 1)).toBe(1);
    expect(clamp(Infinity, 0, 1)).toBe(1);
  });

  it(`should return value if it's within minimum and maximum`, () => {
    expect(clamp(1, 0, 2)).toBe(1);
  });

  it(`should return NaN if value is NaN`, () => {
    expect(clamp(NaN, 0, 1)).toBe(NaN);
  });

  it(`should return unexpected value with typecast, do USE it with numbers only`, () => {
    expect(clamp(null as any, 0, 1)).toBeNull();
    expect(clamp(undefined as any, -1, 1)).toBeUndefined();
    expect(clamp('' as any, 0, 2)).toBe('');

    const obj = {};
    expect(clamp(obj as any, 1, 2)).toBe(obj);
  });
});
