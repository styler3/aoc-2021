const input = require('./input');

// Filter out all non-horizontal, non-vertical lines as per the question
const straightLines = input.filter((position) => {
  const [[x1, y1], [x2, y2]] = position;
  if (x1 === x2) {
    return true;
  }
  if (y1 === y2) {
    return true;
  }
  return false;
});

function getPoints(straightLine) {
  const [[x1, y1], [x2, y2]] = straightLine;
  if (x1 === x2) {
    const length = Math.abs(y2 - y1);
    const start = Math.min(y1, y2);
    return new Array(length + 1).fill(null).map((_, index) => {
      return [x1, start + index];
    });
  }
  if (y1 === y2) {
    const length = Math.abs(x1 - x2);
    const start = Math.min(x1, x2);
    return new Array(length + 1).fill(null).map((_, index) => {
      return [start + index, y1];
    });
  }
}

let vents = {};

straightLines.forEach((position) => {
  const points = getPoints(position);
  points.forEach((point) => {
    const [x, y] = point;
    const ventKey = `${x},${y}`; // Create a string to index into vents
    if (vents[ventKey]) {
      vents[ventKey] = vents[ventKey] + 1
    } else {
      vents[ventKey] = 1;
    }
  });
});

// Count how many points have two or more vents on them
const totalDangerousVents = Object.values(vents).reduce((total, ventValue) => {
  if (ventValue >= 2) {
    return total + 1;
  }
  return total;
}, 0);

console.log(`Answer: ${totalDangerousVents}`);
