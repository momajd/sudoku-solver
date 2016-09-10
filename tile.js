var Tile = function(val, row, col, tileSize, color) {
  this.val = val;
  this.row = row;
  this.col = col;
  this.tileSize = tileSize;
  this.color = color;
};

Tile.prototype.drawTile = function (context) {
  context.font = "20px Georgia"; //TODO use cool google font
  context.fillText(this.val, this.row * tileSize + tileSize/2, this.col * tileSize + tileSize/2);
};
