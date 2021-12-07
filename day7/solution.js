const input = require('./input');

function triangular(number) {
  if (number < 0) {
    throw new Error('Assumed wrong, punk');
  }
  if (number === 0) {
    return 0;
  }
  return number + triangular(number - 1);
}

function getFuelCost(inputArray, targetPosition) {
  return inputArray.reduce((answer, currentCrab) => {
    return answer + Math.abs(targetPosition - currentCrab);
  }, 0);
}

function getFuelCostTwo(inputArray, targetPosition) {
  return inputArray.reduce((answer, currentCrab) => {
    const distance = Math.abs(targetPosition - currentCrab);
    return answer + triangular(distance);
  }, 0);
}

function findBest(min, max, fuelCostFunction) {
  if (min === max) {
    return min;
  }
  const minFuelCost = fuelCostFunction(input, min);
  const maxFuelCost = fuelCostFunction(input, max);
  if (max - min === 1) {
    return minFuelCost < maxFuelCost ? min : max;
  }
  const midpoint = Math.round((max + min) / 2);
  if (minFuelCost < maxFuelCost) {
    return findBest(min, midpoint, fuelCostFunction);
  }
  return findBest(midpoint, max, fuelCostFunction);
}

let min = Math.min(...input);
let max = Math.max(...input);

const bestPositionOne = findBest(min, max, getFuelCost);
const bestFuelOne = getFuelCost(input, bestPositionOne);

const bestPositionTwo = findBest(min, max, getFuelCostTwo);
const bestFuelTwo = getFuelCostTwo(input, bestPositionTwo);

console.log(`Answer1: ${bestFuelOne}`);
console.log(`Answer1: ${bestFuelTwo}`);
