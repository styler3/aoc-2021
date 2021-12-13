const input = require('./input');

const lowPoints = [];

function getAtCoords(row, column) {
  if (row < 0 || column < 0) {
    return Infinity;
  }
  if (row > input.length - 1) {
    return Infinity;
  }
  if (column > input[0].length - 1) {
    return Infinity;
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
      lowPoints.push(value);
    }
  });
});

const answer = lowPoints.map(point => point + 1).reduce((a, b) => a + b);
console.log(`Answer: ${answer}`);
