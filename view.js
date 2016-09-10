var View = function (context, boardSize) {
  this.context = context;
  this.board = new Board(this, boardSize);
  this.animationQueue = [];
};

View.prototype.renderTile = function (tile) {
  this.clearTile(tile);
  var size = tile.tileSize;
  context.font = "20px Georgia"; //TODO use cool google font
  context.fillStyle = tile.color;
  context.fillText(tile.val, tile.row * size + size/2, tile.col * size + size/2);
}

View.prototype.clearTile = function (tile) {
  context.clearRect(
    tile.row * tile.tileSize + 1/10 * tile.tileSize,
    tile.col * tile.tileSize + 1/10 * tile.tileSize,
    tile.tileSize * 4/5,
    tile.tileSize * 4/5
  );
}

View.prototype.addToAnimationQueue = function(tile) {
  this.animationQueue.push(tile);
}

View.prototype.animate = function () {
  if (this.animationQueue.length === 0) {return;}
  let tile = this.animationQueue.shift();

  var self = this;
  var timing = document.getElementById('slider').value;
  setTimeout(function() {
    if (tile.val === "") {
      self.clearTile(tile);
    } else {
      self.renderTile(tile);
    }
    self.animate();
  }, timing);
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
        this.renderTile(tile);
      }.bind(this), j * 125)
    }
  }
};
