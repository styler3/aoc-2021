const input = require('./input');

function getSum(inputArray) {
  return inputArray.reduce((x, y) => x + y);
}

const solutionOne = input.reduce(({ previous, answer }, current) => {
  if (current > previous) {
    return {
      previous: current,
      answer: answer + 1
    }
  }
  return {
    previous: current,
    answer
  }
}, {
  previous: Infinity,
  answer: 0
});

const solutionTwo = input.reduce(({ parts, sum, answer }, current) => {
  // At first, wait until we have three
  if (parts.length < 3) {
    return {
      parts: [...parts, current],
      answer
    }
  }
  const currentParts = [...parts.slice(1), current];
  const currentSum = getSum(currentParts);
  if (currentSum > sum) {
    return {
      parts: currentParts,
      sum: currentSum,
      answer: answer + 1
    }
  }
  return {
    parts: currentParts,
    sum: currentSum,
    answer
  }
}, {
  parts: [],
  sum: Infinity,
  answer: 0
});

console.log(`Part1: ${solutionOne.answer}`);
console.log(`Part2: ${solutionTwo.answer}`);
