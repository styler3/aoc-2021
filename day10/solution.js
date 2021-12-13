const input = require('./input');

const bracketPairs = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
};

const illegalCharacterScores = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
};

function doMatch(open, close) {
  return bracketPairs[open] === close;
}

function getFirstError(chunk) {
  const openStack = [];
  for (character of chunk) {
    if (Object.keys(bracketPairs).includes(character)) {
      openStack.push(character);
      continue;
    }
    const lastOpen = openStack.pop();
    if (bracketPairs[lastOpen] !== character) {
      return illegalCharacterScores[character];
    }
  }
  return 0;
}

function partOne() {
  const answer = input.map(getFirstError).reduce((a, b) => a + b);
  console.log(`Answer Part One: ${answer}`);
};

partOne();
