const pluralCases = [2, 0, 1, 1, 1, 2];

export const getPluralIndex = number =>
  number % 100 > 4 && number % 100 < 20 ? 2 : pluralCases[number % 10 < 5 ? number % 10 : 5];
