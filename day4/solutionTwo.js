const { draws, boards } = require('./input');
const BingoBoard = require('./BingoBoard');

const bingoBoards = boards.map(board => new BingoBoard(board));
draws.forEach((draw, index) => {
  bingoBoards.forEach((board) => {
    board.draw(draw);
  });
  const remainingBoards = bingoBoards.reduce((total, board) => {
    if (board.hasBingo) {
      return total;
    }
    return total + 1;
  }, 0);
  if (remainingBoards === 1) {
    const lastBoard = bingoBoards.find((board) => !board.hasBingo);
    const remainingDraws = draws.slice(index + 1);
    remainingDraws.forEach((remainingDraw) => {
      lastBoard.draw(remainingDraw);
      if (lastBoard.hasBingo) {
        console.log(`Total of unmarked: ${lastBoard.totalOfUnmarked}`);
        console.log(`Number Drawn: ${remainingDraw}`);
        console.log(`Answer: ${lastBoard.totalOfUnmarked * remainingDraw}`);
        process.exit(0);
      }
    });
  }
});

