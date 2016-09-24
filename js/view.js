var View = function (context, boardSize, board) {
  this.context = context;
  this.board = new Board(this, boardSize, board);
  this.animationQueue = [];
  this.paused = true;
};

View.prototype.renderTile = function (tile) {
  this.clearTile(tile);
  var size = tile.tileSize;
  this.context.font = tile.font;
  this.context.fillStyle = tile.color;
  this.context.fillText(tile.val, tile.col * size + 25, tile.row * size + 45);
}

View.prototype.clearTile = function (tile) {
  this.context.beginPath();
  this.context.rect(
    tile.col * tile.tileSize + 1/10 * tile.tileSize,
    tile.row * tile.tileSize + 1/10 * tile.tileSize,
    tile.tileSize * 4/5,
    tile.tileSize * 4/5
  );
  this.context.fillStyle = 'white';
  this.context.fill();
}

View.prototype.addToAnimationQueue = function(tile) {
  this.animationQueue.push(tile);
}

View.prototype.animate = function () {
  if (this.animationQueue.length === 0 || this.paused) {return;}
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
  context.beginPath();
  context.rect(0, 0, this.board.size, this.board.size);
  context.fillStyle = 'white';
  context.fill();

  // heavy lines around 3 x 3 tiles
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      context.beginPath();
      context.rect(i * 3 * tileSize, j * 3 * tileSize, 3 * tileSize, 3 * tileSize);
      context.lineWidth = 4;
      context.stroke();
    }
  }

  // light vertical and horizonal lines for rows and columns
  for (i = 0; i < 9; i++) {
      context.beginPath();
      context.moveTo(i * tileSize, 0)
      context.lineTo(i * tileSize, this.board.size);
      context.lineWidth = 1;
      context.stroke();

      context.beginPath();
      context.moveTo(0, i * tileSize)
      context.lineTo(this.board.size, i * tileSize);
      context.stroke();
  }

  // tile values
  for (i = 0; i < 9; i++)  {
    for (j = 0; j < 9; j++) {
      var tileValue = this.board.grid[i][j] === "." ? "" : this.board.grid[i][j];
      let tile = new Tile(tileValue, i, j, tileSize, 'black', '40px sans-serif');
      setTimeout(function() {
        this.renderTile(tile);
      }.bind(this), j * 125)
    }
  }
};

View.prototype.activateInput = function () {
  this.board.emptyBoard();
  this.drawBoard();
  var row = 0, col = 0;
  this.drawBlinkingCursor(row, col);

  var canvas = document.getElementById('canvas');
  var tileSize = this.board.size / 9;

  canvas.addEventListener('mousedown', function (e) {
    this.clearExistingCursor(row, col);

    row = Math.floor(e.offsetY / tileSize);
    col = Math.floor(e.offsetX / tileSize);
    this.drawBlinkingCursor(row, col);
  }.bind(this));

  const vals = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
  document.addEventListener('keydown', function (e) {
    if ( vals.has(e.key) ) {
      this.board.insertValue(row, col, e.key);
      var tile = new Tile(e.key, row, col, tileSize, 'black', '40px sans-serif');
      this.renderTile(tile);
    } else if ( e.keyCode >= 37 && e.keyCode <= 40 ) {
      // move cursor with arrow keys
      this.clearExistingCursor(row, col);
      if ( e.key === "ArrowDown" && row < 8 ) { row += 1; }
      if ( e.key === "ArrowUp" && row > 0 ) { row -= 1; }
      if ( e.key === "ArrowRight" && col < 8 ) { col += 1; }
      if ( e.key === "ArrowLeft" && col > 0 ) { col -= 1; }
      this.drawBlinkingCursor(row, col);
    }
  }.bind(this));
};

View.prototype.deactivateInput = function () {
  
};

View.prototype.drawCursorLine = function (row, col) {
  var tileSize = this.board.size / 9;
  this.context.beginPath();
  this.context.moveTo(col * tileSize + 1/5*tileSize, row * tileSize + 1/5*tileSize);
  this.context.lineTo(col * tileSize + 1/5*tileSize, row * tileSize + 4/5*tileSize);
  this.context.lineWidth = 3;
  this.context.stroke();
};

View.prototype.removeCursorLine = function (row, col) {
  var tileSize = this.board.size / 9;
  this.context.beginPath();

  this.context.rect(
    col * tileSize + 1/10 * tileSize,
    row * tileSize + 1/10 * tileSize,
    tileSize * 1/5,
    tileSize * 4/5
  );
  this.context.fillStyle = 'white';
  this.context.fill();
}

View.prototype.drawBlinkingCursor = function (row, col) {
  var self = this;
  self.drawCursorLine(row, col);

  this.cursor = setInterval(function() {
    self.drawCursorLine(row, col);
    setTimeout(function() {
      self.removeCursorLine(row, col);
    }, 400);
  }, 800);
};

View.prototype.clearExistingCursor = function (row, col) {
  clearInterval(this.cursor);
  this.removeCursorLine(row, col);
}
