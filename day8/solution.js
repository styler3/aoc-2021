const challengeInput = require('./input');
const splitChallengeInput = challengeInput.map(line => line.split(' | '));

const uniqueLengths = [
  null, //0
  2, //1
  null, //2
  null, //3
  4, //4
  null, //5
  null, //6
  3, //7
  7, //8
  null //9
];

function partOne() {
  const outputs = splitChallengeInput.map(([,output]) => output);
  const answer = outputs.reduce((total, currentOutput) => {
    const digits = currentOutput.split(' ');
    const outputTotal = digits.reduce((sum, digit) => {
      if (uniqueLengths.find(length => length === digit.length)) {
        return sum + 1;
      }
      return sum;
    }, 0)
    return total + outputTotal;
  }, 0);
  console.log(`Answer Part One: ${answer}`);
}

partOne();
