export const returnDefaultNumber = (defaultNumber: number, change: number | null): number =>
  change !== null ? change : defaultNumber;

export const returnDefaultNumbers = (defaultNumber: number[], change: number[] | null): number[] =>
  change !== null ? change : defaultNumber;
