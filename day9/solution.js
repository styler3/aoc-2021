const input = require('./input');

const lowPointCoords = [];
const lowPoints = [];

function getAtCoords(row, column) {
  if (row < 0 || column < 0) {
    return 9;
  }
  if (row > input.length - 1) {
    return 9;
  }
  if (column > input[0].length - 1) {
    return 9;
  }
  return input[row][column];
};

input.forEach((row, rowIndex) => {
  row.forEach((value, columnIndex) => {
    const above = getAtCoords(rowIndex - 1, columnIndex);
    const left = getAtCoords(rowIndex, columnIndex - 1);
    const right = getAtCoords(rowIndex, columnIndex + 1);
    const below = getAtCoords(rowIndex + 1, columnIndex);
    if (value < above && value < left && value < right && value < below) {
      lowPointCoords.push([rowIndex, columnIndex]);
      lowPoints.push(value);
    }
  });
});

function getBasinSize(startingCoords) {
  const searchStack = [startingCoords];
  const pointsInBasin = [];
  while (searchStack.length > 0) {
    const [row, column] = searchStack.pop();
    if (getAtCoords(row, column) === 9) {
      continue;
    }
    if (pointsInBasin.includes(`${row},${column}`)) {
      continue;
    }
    pointsInBasin.push(`${row},${column}`);
    searchStack.push(
      [row - 1, column],
      [row, column - 1],
      [row, column + 1],
      [row + 1, column]
    );
  }
  return pointsInBasin.length;
}

const answerOne = lowPoints.map(point => point + 1).reduce((a, b) => a + b);
console.log(`Answer Part One: ${answerOne}`);

// Get the three biggest basins
const [a,b,c] = lowPointCoords.map(getBasinSize).sort((a, b) => a - b).reverse();
console.log(`Answer Part Two: ${a * b * c}`);
