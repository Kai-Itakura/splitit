export function isSameArray<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) return false;
  if (arr1.length === 0) return true;

  return arr1.every((str1) => arr2.includes(str1));
}
