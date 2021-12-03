const input = require('./input');

const numberOfDigits = 12;

// The number of ones in each slot
const oneCounts = input.reduce((result, currentInput) => {
  const parts = currentInput.split('');
  return result.map((count, index) => {
    return parts[index] === '1' ? count + 1 : count;
  });
}, new Array(numberOfDigits).fill(0))

const gammaDigits = oneCounts.map((count) => {
  return count / input.length > 0.5 ? '1' : '0';
});

const epsilonDigits = oneCounts.map((count) => {
  return count / input.length > 0.5 ? '0' : '1';
});

const gamma = parseInt(gammaDigits.join(''), 2);
const epsilon = parseInt(epsilonDigits.join(''), 2);

console.log(gamma * epsilon);
