const challengeInput = require('./input');
const processedInput = challengeInput
  .map(line => line.split(' | ')
    .map(numbers => numbers.split(' ')
      // Sort them by letter so that they are always the same in the input as
      // the output
      .map(input => input.split('').sort().join(''))
    )
  );

/**
 * Flip the keys and values of an object to make lookup easier
 */
function reverseObject(inputObject) {
  return Object.fromEntries(
    Object.entries(inputObject).map(entry => entry.reverse())
  );
}

function solve(numberMapping, output) {
  const numberByInput = reverseObject(numberMapping);
  const lookupDigit = digit => numberByInput[digit];
  if (output.every(lookupDigit)) {
    return parseInt(output.map(lookupDigit).join(''), 10);
  }
  return false;
}

function decodeRow([inputs, output]) {
  const numberMapping = new Array(10);

  inputs.forEach((input) => {
    switch(input.length) {
      case 2: {
        numberMapping[1] = input;
        break;
      }
      case 3: {
        numberMapping[7] = input;
        break;
      }
      case 4: {
        numberMapping[4] = input;
        break;
      }
      case 7: {
        numberMapping[8] = input;
        break;
      }
      default: {
        break;
      }
    }
  });

  // 6 segment numbers
  inputs.filter(input => input.length === 6).forEach((input) => {
    if (!numberMapping[7].split('').every(character => input.includes(character))) {
      // If it's length is 6 and every input is also in 7, it's 6
      numberMapping[6] = input;
      return;
    }
    if (numberMapping[4].split('').every(character => input.includes(character))) {
      // If it's length is 6 and every input is also in 4, it's 9
      numberMapping[9] = input;
      return;
    }
    // If it's length is 6 and none of the other cases came up, it's 0
    numberMapping[0] = input
  });

  // 5 segment numbers
  inputs.filter(input => input.length === 5).forEach((input) => {
    if (input.split('').every(character => numberMapping[6].split('').includes(character))) {
      // If it's length is 5 and every segment is also in 6, it's 5
      numberMapping[5] = input;
      return;
    }
    if (numberMapping[1].split('').every(character => input.includes(character))) {
      // If it's length is 5 and every segment is also in 1, it's 3
      numberMapping[3] = input;
      return;
    }
    // If it's length is 5 and none of the other cases came up, it's 2
    numberMapping[2] = input;
  });

  return solve(numberMapping, output);
}

const values = processedInput.map(decodeRow);
const answer = values.reduce((a, b) => a + b);
console.log(`Answer: ${answer}`);
