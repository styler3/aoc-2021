const input = require('./input');

function considerDigit(options, digitPosition, useLowest) {
  const digitTotals = options.reduce((result, option) => {
    const value = option.charAt(digitPosition);
    return { ...result, [value]: result[value] + 1 };
  }, {
    '1': 0,
    '0': 0
  });
  const highestCounted = digitTotals['0'] > digitTotals['1'] ? '0' : '1';
  const lowestCounted = highestCounted === '1' ? '0' : '1';
  const filterToUse = useLowest ? highestCounted : lowestCounted;
  return options.filter(option => option.charAt(digitPosition) === filterToUse);
}

function getOxygen(options, digitPosition = 0) {
  if (options.length === 1) {
    return options[0];
  }
  return getOxygen(
    considerDigit(options, digitPosition, false),
    digitPosition + 1
  );
}

function getCo2(options, digitPosition = 0) {
  if (options.length === 1) {
    return options[0];
  }
  return getCo2(
    considerDigit(options, digitPosition, true),
    digitPosition + 1
  );
}

console.log(parseInt(getOxygen(input), 2) * parseInt(getCo2(input), 2));
