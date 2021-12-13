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

const autocompleteScores = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
}

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

function isValid(chunk) {
  return getFirstError(chunk) === 0;
}

function getFinishingCharacters(chunk) {
  const openStack = [];
  for (character of chunk) {
    if (Object.keys(bracketPairs).includes(character)) {
      openStack.push(character);
      continue;
    }
    // We can assume they're valid here so we don't atually need to check the
    // ending character at all
    openStack.pop();
  }
  return openStack.map(character => bracketPairs[character]).reverse();
}

function getAutocompleteScore(characters) {
  return characters.reduce((total, character) => {
    return total * 5 + autocompleteScores[character];
  }, 0)
}

function partOne() {
  const answer = input.map(getFirstError).reduce((a, b) => a + b);
  console.log(`Answer Part One: ${answer}`);
};

function partTwo() {
  const validInput = input.filter(isValid);
  const completions = validInput.map(getFinishingCharacters)
  const autocompleteScores = completions.map(getAutocompleteScore);
  const answer = autocompleteScores.sort((a, b) => a - b)[Math.floor(autocompleteScores.length / 2)];
  console.log(`Answer Part Two: ${answer}`)
}

partOne();
partTwo();
