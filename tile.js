var Tile = function(val, row, col, tileSize, color) {
  this.val = val;
  this.row = row;
  this.col = col;
  this.tileSize = tileSize;
  this.color = color;
};

Tile.prototype.drawTile = function (context) {
  var size = this.tileSize;
  context.font = "20px Georgia"; //TODO use cool google font
  context.fillStyle = this.color;
  context.fillText(this.val, this.row * size + size/2, this.col * size + size/2);
};
