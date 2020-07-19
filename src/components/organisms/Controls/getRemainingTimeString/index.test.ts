import { getRemainingTimeString } from './';

describe('getRemainingTimeString', () => {
  it(`should return duration as a string for start`, () => {
    expect(getRemainingTimeString({ currentTime: 0, duration: 1 })).toBe('00:01');
    expect(getRemainingTimeString({ currentTime: 0, duration: 10 })).toBe('00:10');
    expect(getRemainingTimeString({ currentTime: 0, duration: 60 })).toBe('01:00');
    expect(getRemainingTimeString({ currentTime: 0, duration: 600 })).toBe('10:00');
  });

  it(`should return duration - currentTime as a string during watching`, () => {
    expect(getRemainingTimeString({ currentTime: 5, duration: 10 })).toBe('00:05');
    expect(getRemainingTimeString({ currentTime: 10, duration: 60 })).toBe('00:50');
    expect(getRemainingTimeString({ currentTime: 60, duration: 6 * 60 })).toBe('05:00');
    expect(getRemainingTimeString({ currentTime: 10 * 60, duration: 60 * 60 })).toBe('50:00');
  });

  it(`should return 00:00 at the end`, () => {
    expect(getRemainingTimeString({ currentTime: 10, duration: 10 })).toBe('00:00');
    expect(getRemainingTimeString({ currentTime: 60, duration: 60 })).toBe('00:00');
    expect(getRemainingTimeString({ currentTime: 6 * 60, duration: 6 * 60 })).toBe('00:00');
    expect(getRemainingTimeString({ currentTime: 60 * 60, duration: 60 * 60 })).toBe('00:00');
  });

  it(`expects duration is positive finite number`, () => {
    expect(getRemainingTimeString({ currentTime: 0, duration: undefined as any })).toBe('NaN:NaN');
    expect(getRemainingTimeString({ currentTime: 0, duration: null as any })).toBe('00:00');
    expect(getRemainingTimeString({ currentTime: 0, duration: Infinity })).toBe('Infinity:NaN');
    expect(getRemainingTimeString({ currentTime: 0, duration: -Infinity })).toBe('-Infinity:NaN');
    expect(getRemainingTimeString({ currentTime: 0, duration: '' as any })).toBe('00:00');
    expect(getRemainingTimeString({ currentTime: 0, duration: {} as any })).toBe('NaN:NaN');
    expect(getRemainingTimeString({ currentTime: 0, duration: [] as any })).toBe('00:00');
  });

  it(`expects currentTime is non-negative finite number`, () => {
    expect(getRemainingTimeString({ currentTime: -1, duration: 10 })).toBe('00:11');
    expect(getRemainingTimeString({ currentTime: -Infinity, duration: 10 })).toBe('Infinity:NaN');
    expect(getRemainingTimeString({ currentTime: Infinity, duration: 10 })).toBe('-Infinity:NaN');
    expect(getRemainingTimeString({ currentTime: NaN, duration: 10 })).toBe('NaN:NaN');
    expect(getRemainingTimeString({ currentTime: '' as any, duration: 10 })).toBe('00:10');
    expect(getRemainingTimeString({ currentTime: {} as any, duration: 10 })).toBe('NaN:NaN');
    expect(getRemainingTimeString({ currentTime: [] as any, duration: 10 })).toBe('00:10');
  });
});