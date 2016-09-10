var View = function (context) {
  this.context = context;
  this.board = new Board(this, 400);
  this.animationQueue = [];
};

View.prototype.renderCandidateTile = function (tile) {
  var context = this.context
  setTimeout(function () {
    tile.drawTile(context);
  }, animationCount * window.speed)
}

View.prototype.clearIncorrectTile = function (tile) {
  var context = this.context;
  setTimeout(function () {
    context.clearRect(
      tile.row * tile.tileSize + 1/10 * tile.tileSize,
      tile.col * tile.tileSize + 1/10 * tile.tileSize,
      tile.tileSize * 4/5,
      tile.tileSize * 4/5
    );
  }, animationCount * window.speed)
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
