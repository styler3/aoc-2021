const input = require('./input');

const finalPositionOne = input.reduce(({ horizontal, depth }, [direction, size]) => {
  if (direction === 'forward') {
    return {
      horizontal: horizontal + size,
      depth
    };
  }
  if (direction === 'down') {
    return {
      horizontal,
      depth: depth + size
    };
  }
  if (direction === 'up') {
    return {
      horizontal,
      depth: depth - size
    };
  }
  throw new Error('You fucked something up');
}, {
  horizontal: 0,
  depth: 0
})

const finalPositionTwo = input.reduce(({ horizontal, depth, aim }, [direction, size]) => {
  if (direction === 'down') {
    return {
      horizontal,
      depth,
      aim: aim + size
    };
  }
  if (direction === 'up') {
    return {
      horizontal,
      depth,
      aim: aim - size
    };
  }
  if (direction === 'forward') {
    return {
      horizontal: horizontal + size,
      depth: depth + (aim * size),
      aim
    };
  }
  throw new Error('You fucked something up');
}, {
  horizontal: 0,
  depth: 0,
  aim: 0
});

console.log(`Part1: ${finalPositionOne.horizontal * finalPositionOne.depth}`);
console.log(`Part2: ${finalPositionTwo.horizontal * finalPositionTwo.depth}`);
