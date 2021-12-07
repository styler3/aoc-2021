const input = require('./input');

function getFuelCost(inputArray, targetPosition) {
  return inputArray.reduce((answer, currentCrab) => {
    return answer + Math.abs(targetPosition - currentCrab);
  }, 0);
}

function findBest(min, max) {
  if (min === max) {
    return min;
  }
  const minFuelCost = getFuelCost(input, min);
  const maxFuelCost = getFuelCost(input, max);
  if (max - min === 1) {
    return minFuelCost < maxFuelCost ? min : max;
  }
  const midpoint = Math.round((max + min) / 2);
  if (minFuelCost < maxFuelCost) {
    return findBest(min, midpoint);
  }
  return findBest(midpoint, max);
}

let min = Math.min(...input);
let max = Math.max(...input);

const bestPosition = findBest(min, max);
const bestFuel = getFuelCost(input, bestPosition);

console.log(`Answer: ${bestFuel}`);
