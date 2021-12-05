const input = require('./input');

function getPoints(position) {
  const [[x1, y1], [x2, y2]] = position;
  let xStep = x1 === x2 ? 0 :
    x1 < x2 ? 1 :
    -1;
  let yStep = y1 === y2 ? 0 :
    y1 < y2 ? 1 :
    -1
  let points = [], resultX = x1, resultY = y1;
  while(resultX !== x2 || resultY !== y2) {
    points.push([resultX, resultY]);
    resultX += xStep;
    resultY += yStep;
  }
  points.push([x2, y2]); // Add the last point on
  return points;
}

let vents = {};

input.forEach((position) => {
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
