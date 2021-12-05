const { draws, boards } = require('./input');
const BingoBoard = require('./BingoBoard');

const bingoBoards = boards.map(board => new BingoBoard(board));
draws.forEach((draw) => {
  bingoBoards.forEach((board) => {
    board.draw(draw);
    if (board.hasBingo) {
      console.log(`Total of unmarked: ${board.totalOfUnmarked}`);
      console.log(`Number Drawn: ${draw}`);
      console.log(`Answer: ${board.totalOfUnmarked * draw}`);
      process.exit(0);
    }
  });
});

