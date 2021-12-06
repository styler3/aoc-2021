const input = require('./input');
// const input = [3,4,3,1,2];

// Set up the inital state
let state = new Array(9).fill(0);
input.forEach((fish) => {
  state[fish]++;
});

function dayPasses(doDebug) {
  let nextState = new Array(9);
  const reproduceCount = state[0];
  for (let age = 1; age <= 8; age++) {
    nextState[age - 1] = state[age];
  }
  nextState[6] += reproduceCount;
  nextState[8] = reproduceCount;
  state = nextState;
};

// Change this as appropriate
const numberOfDays = 256;

for (let i = 1; i <= numberOfDays; i++) {
  dayPasses();
}

const answer = state.reduce((a, b) => a + b);

console.log(`Answer: ${answer}`);
