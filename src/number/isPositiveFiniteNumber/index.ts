export const isPositiveFiniteNumber = (n: unknown): n is number => {
  if (typeof n !== 'number') {
    return false;
  }

  if (!isFinite(n)) {
    return false;
  }

  if (n <= 0) {
    return false;
  }

  return true;
};