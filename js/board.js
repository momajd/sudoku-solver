/* eslint no-undef:1, max-len:0*/

class Board {
  constructor(view, size, board) {
    this.view = view;
    this.size = size;
    this.grid = board;
  }

  isValidSudoku() {
    for (let i = 0; i < 9; i++) {
      let seenRowVals = new Set;
      let seenColVals = new Set;
      let seenSquareVals = new Set;

      for (let j = 0; j < 9; j++) {
        // check rows
        if (seenRowVals.has(this.grid[i][j])) {return false;}
        if (this.grid[i][j] !== ".") {seenRowVals.add(this.grid[i][j]);}

        // check columns
        if (seenColVals.has(this.grid[j][i])) {return false;}
        if (this.grid[j][i] !== ".") {seenColVals.add(this.grid[j][i]);}

        // check 3x3 squares
        let row = 3 * Math.floor(i/3) + Math.floor(j/3);
        let col = 3 * (i % 3) + (j % 3);
        if (seenSquareVals.has(this.grid[row][col]) ) {return false;}
        if (this.grid[row][col] !== ".") {seenSquareVals.add(this.grid[row][col]);}
      }
    }
    return true;
  }

  solveSudoku() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.grid[i][j] !== ".") { continue; }

        const vals = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

        for (let k = 0; k < vals.length; k++) {
          this.grid[i][j] = vals[k];

          let tile = new Tile(vals[k], i, j, this.size / 9, 'blue', '40px Permanent Marker');
          this.view.addToAnimationQueue(tile);

          if (this.isValidSudoku() && this.solveSudoku() ) {return true;}
          this.grid[i][j] = "."; //wasn't able to solve so backtrack
        }

        let removal = new Tile("", i, j, this.size / 9);
        this.view.addToAnimationQueue(removal);
        return false; //no vals satisfy isValidSudoku
      }
    }
    return true; //board is filled
  }

  insertValue(row, col, val) {
    this.grid[row][col] = val;
  }

  emptyBoard() {
    this.grid = [
        ".........".split(""),
        ".........".split(""),
        ".........".split(""),
        ".........".split(""),
        ".........".split(""),
        ".........".split(""),
        ".........".split(""),
        ".........".split(""),
        ".........".split("")
      ];
    this.iterationCount = 0;
  }
}

Array.prototype.dupBoard = function() {
  let newBoard = new Array(9);
  for (let i = 0; i < 9; i++) {newBoard[i] = (new Array(9));}

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      newBoard[i][j] = this[i][j].slice();
    }
  }
  return newBoard;
};
