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
  "6.318275.".split(""),
  "871569.24".split(""),
  "2957.3681".split(""),
  "734956218".split(""),
  "982.71536".split(""),
  "15632894.".split(""),
  "36.294175".split(""),
  "4276158.3".split(""),
  "519.37462".split("")
];

var board3 = [
  "643182759".split(""),
  "871569324".split(""),
  "295743681".split(""),
  "734956218".split(""),
  "982471536".split(""),
  "156328947".split(""),
  "36.294175".split(""),
  "427615893".split(""),
  "519837462".split("")
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

var Board = function () {
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
      this.printBoard();
      for (var k = 0; k < vals.length; k++) {
        this.grid[i][j] = vals[k];
        if (this.isValidSudoku() ) {
          if (this.solveSudoku()) {
            return true;
          }
        }
        this.grid[i][j] = "."; //wasn't able to solve so backtrack
      }
      return false; //no vals satisfy isValidSudoku
    }
  }
  return true; //board is filled
};

Board.prototype.printBoard = function () {
  this.grid.forEach(function(row) {
    console.log(row.join(""));
  });
  console.log("");
};

Board.prototype.drawBoard = function (context, tileSize) {
  // heavy lines around 3 x 3 tiles
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      context.rect(i * 3 * tileSize, j * 3 * tileSize, 3 * tileSize, 3 * tileSize);
      context.lineWidth = 4;
      context.strokeStyle = 'black';
      context.stroke();
    }
  }

  // this lines around each tile
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      context.rect(i * tileSize, j * tileSize, tileSize, tileSize);
      context.lineWidth = 1;
      context.strokeStyle = 'black';
      context.stroke();

      var tileValue = this.grid[i][j] === "." ? "" : this.grid[i][j];
      let tile = new Tile(tileValue, i, j, tileSize);
      tile.drawTile(context);
    }
  }
};
