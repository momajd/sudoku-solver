var board1 = [
  "..3.1589.".split(""),
  ".76.9.2.5".split(""),
  ".9...2...".split(""),
  "..7361.4.".split(""),
  "9....41.7".split(""),
  "...2...3.".split(""),
  "3.......4".split(""),
  "254.3...1".split(""),
  ".1.5..32.".split("")
];

var board2 = [
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

var board4 = [
  "1...2...4".split(""),
  "..78.62..".split(""),
  ".8.....3.".split(""),
  ".3..6..9.".split(""),
  "7..5.1..6".split(""),
  ".4..3..7.".split(""),
  ".5.....1.".split(""),
  "..43.87..".split(""),
  "6...1...5".split("")
];

var Board = function (view, size) {
  this.view = view;
  this.size = size;
  this.grid = board4;
};

Board.prototype.isValidSudoku = function () {
  for (var i = 0; i < 9; i++) {
    var seenRowVals = new Set;
    var seenColVals = new Set;
    var seenSquareVals = new Set;

    for (var j = 0; j < 9; j++) {
      // check rows
      if (seenRowVals.has(this.grid[i][j])) {return false;}
      if (this.grid[i][j] !== ".") {seenRowVals.add(this.grid[i][j]);}

      // check columns
      if (seenColVals.has(this.grid[j][i])) {return false;}
      if (this.grid[j][i] !== ".") {seenColVals.add(this.grid[j][i]);}

      // check 3x3 squares
      var row = 3 * Math.floor(i/3) + Math.floor(j/3);
      var col = 3 * (i % 3) + (j % 3);
      if (seenSquareVals.has(this.grid[row][col]) ) {return false;}
      if (this.grid[row][col] !== ".") {seenSquareVals.add(this.grid[row][col]);}
    }
  }
  return true;
};

Board.prototype.solveSudoku = function () {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (this.grid[i][j] !== ".") { continue; }

      var vals = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

      for (var k = 0; k < vals.length; k++) {
        this.grid[i][j] = vals[k];

        let tile = new Tile(vals[k], i, j, this.size / 9, 'blue');
        this.view.addToAnimationQueue(tile);

        if (this.isValidSudoku() ) {
          if (this.solveSudoku()) {
            return true;
          }
        }
        this.grid[i][j] = "."; //wasn't able to solve so backtrack
      }
      let removal = new Tile("", i, j, this.size / 9);
      this.view.addToAnimationQueue(removal);
      return false; //no vals satisfy isValidSudoku
    }
  }
  return true; //board is filled
};
