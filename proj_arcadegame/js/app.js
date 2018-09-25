class Enemy { // new class for Enemy
  constructor(x,y,speed) {
    this.sprite = 'images/enemy-bug.png';
    this.horizontal = 101; // size of steps left/right
    this.x = x; // current x axis position
    this.y = y + 55; // current y axis position, centered
    this.speed = speed;
    this.rightBoundary = this.horizontal * 5;
  }

  update(dt) { // update the enemy's position
    if (this.x < this.rightBoundary) { // if enemy is not past right boundary
      this.x += this.speed * dt; // move enemy to the right
    } else {
      this.x = -this.horizontal; // reset position to start
    }
  }

  render() { // draw the enemy on the screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); // get sprite img and current position
  }
}

class Player { // new class for Player
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.horizontal = 101; // size of steps left/right
    this.vertical = 83; // size of steps up/down
    this.startX = this.horizontal * 2; // start in the center of the X axis
    this.startY = (this.vertical * 4) + 55; // start in the bottom of the Y axis
    this.x = this.startX; // current x axis position
    this.y = this.startY; // current y axis position
    this.win = false;
  }

  update() {
    for(let enemy of allEnemies) {
      // if the Y axis align. if the enemy's right side is greater than the player's left, then the enemy's left side is less than the player's right
      if (this.y === enemy.y && (enemy.x + enemy.horizontal/2 > this.x && enemy.x < this.x + this.horizontal/2)){
        this.reset(); // reset the game
      }
    }
    if (this.y === 55) {
      this.win = true;
    }
  }

  render() { // draw the player on the screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); // get sprite img and current position
  }

  handleInput(keyPress) { // update x and y based on keys pressed
    if (keyPress === 'left'){ // if left key is pressed
      if (this.x > 0) { // if we are not already in a leftmost position
        this.x -= this.horizontal; // allow us to move left one space
      }
    } else if (keyPress === 'up') { // if the up key is pressed
      if (this.y > this.vertical) { // if we are not already in an uppermost position under the water
        this.y -= this.vertical; // allow us to move up one space
      }
    } else if (keyPress === 'right') { // if the right key is pressed
      if (this.x < (this.horizontal * 4)) { // if we are not already in the a rightmost position
        this.x += this.horizontal; // allow us to move right one space
      }
    } else if (keyPress === 'down') { // if the down key is pressed
      if (this.y < (this.vertical * 4)) { // if we are not already in the lowermost position
        this.y += this.vertical; // allow us to move down one space
      }
    }
    // if in the water, reset to initial location
  }

  reset() {
    this.x = this.startX;
    this.y = this.startY;// set x and y to starting x and y
  }
}

const player = new Player(); // create the player using the Player class

const bug1 = new Enemy(-20,83,190); // create a bug using the Enemy class
const bug2 = new Enemy(-175,83,160); // create a bug using the Enemy class
const bug3 = new Enemy(-50,166,240); // create a bug using the Enemy class

const allEnemies = [];
allEnemies.push(bug1,bug2,bug3); // add our enemies to the array

// This listens for key presses and sends the keys to your Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
