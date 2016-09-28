# Sudoku Solver

##[Live Link][link]

[link]: http://momajd.github.io/sudoku-solver/

A sudoku solver that uses a backtracking algorithm. Built with javascript and HTML5 canvas.

![Intro](http://i.imgur.com/KdErCOU.gif)

## Algorithm

```javascript
// board.js

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
```

## Algorithm visualization
Animations from the `animationQueue` are processed asynchronously:

```javascript
// view.js

animate() {
  if (this.animationQueue.length === 0 || this.paused) {return;}
  this.updateIterationCount();
  let tile = this.animationQueue.shift();

  let self = this;
  let timing = document.getElementById('slider').value;
  setTimeout(function() {
    if (tile.val === "") {
      self.clearTile(tile);
    } else {
      self.renderTile(tile);
    }
    self.animate();
  }, timing);
}

```

## Todo

- [X] Allow user to create a board
