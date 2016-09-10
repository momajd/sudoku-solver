var View = function (context) {
  this.context = context;
  this.board = new Board(this, 400);
  this.animationQueue = [];
};

View.prototype.renderCandidateTile = function (tile) {
  tile.drawTile(this.context);
}

View.prototype.clearIncorrectTile = function (tile) {
  tile.clearTile(this.context);
}

View.prototype.addToAnimationQueue = function(tile) {
  this.animationQueue.push(tile);
}

View.prototype.solveAndAnimate = function () {
  this.board.solveSudoku();
  var self = this;
  var animation = setInterval(function () {
    if (self.animationQueue.length === 1) {clearTimeout(animation)}
    var tile = self.animationQueue.shift();

    if (tile.val === "") {
      self.clearIncorrectTile(tile);
    } else {
      self.renderCandidateTile(tile);
    }
  }, 100);
}

View.prototype.drawBoard = function () {
  var tileSize = this.board.size / 9;
  var context = this.context;
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

      var tileValue = this.board.grid[i][j] === "." ? "" : this.board.grid[i][j];
      let tile = new Tile(tileValue, i, j, tileSize, 'black');
      setTimeout(function() {
        tile.drawTile(context);
      }, j * 125)
    }
  }
};
