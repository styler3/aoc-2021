const X = 'X'

class BingoBoard {
  constructor(numbers) {
    this.numbers = numbers;
  }

  draw(number) {
    this.numbers = this.numbers.map((row) => row.map((column) => {
      if (column === number) {
        return X;
      }
      return column;
    }));
  }

  get hasBingo() {
    const hasRow = this.numbers.some((row) => {
      return row.every((value) => value === X);
    });
    if (hasRow) return true;
    const hasColumn = [0,1,2,3,4].some((columnNumber) => {
      return this.numbers.every((row) => row[columnNumber] === X);
    });
    if (hasColumn) return true;
    return false;
  }

  get totalOfUnmarked() {
    const rowTotals = this.numbers.map((row) => {
      return row.reduce((total, value) => {
        if (value === X) {
          return total;
        }
        return total + value;
      }, 0)
    });
    return rowTotals.reduce((a, b) => a + b);
  }
}

module.exports = BingoBoard;
