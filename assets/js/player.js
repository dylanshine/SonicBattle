function Player(character, controls) {
  this.spawns = [91, 45, 65, 645, 553, 616, 420, 320];
  this.x = this.spawns[Math.floor(Math.random() * this.spawns.length)];
  this.y = 135;
  this.yVel = 0;
  this.defeatedX = 530;
  this.facing = "right";
  this.walking = false;
  this.falling = false;
  this.attacking = false;
  this.blocking = false;
  this.energy = 15;
  this.score = 0;
  this.jumping = true;
  this.score = 0;
  this.tag = "";
  this.health = 20;
  this.speed = 5;
  this.height = 20;
  this.width = 20;
  this.character = character;
  this.scoreId = "#" + this.character + ""
  this.sprite = {
    walkLeft: 'url("./assets/img/' + character + '/walk-left.gif")',
    walkRight: 'url("./assets/img/' + character + '/walk-right.gif")',
    jumpLeft: 'url("./assets/img/' + character + '/jump-left.gif")',
    jumpRight: 'url("./assets/img/' + character + '/jump-right.gif")',
    attackLeft: 'url("./assets/img/' + character + '/attack-left.gif")',
    attackRight: 'url("./assets/img/' + character + '/attack-right.gif")',
    blockLeft: 'url("./assets/img/' + character + '/block-left.gif")',
    blockRight: 'url("./assets/img/' + character + '/block-right.gif")',
    sprintLeft: 'url("./assets/img/' + character + '/sprint-left.gif")',
    sprintRight: 'url("./assets/img/' + character + '/sprint-right.gif")',
    standLeft: 'url("./assets/img/' + character + '/stand-left.gif")',
    standRight: 'url("./assets/img/' + character + '/stand-right.gif")',
    fallLeft: 'url("./assets/img/' + character + '/fall-left.gif")',
    fallRight: 'url("./assets/img/' + character + '/fall-right.gif")'
  };
  this.controls = controls;
}

Player.prototype.move = function() {
  // TODO: move only upon keydown
  if (this.walking === true) {
    switch (this.direction) {
      case 'right':
        this.x += this.speed;
        break;
      case 'left':
        this.x -= this.speed;
        break;
    }
  }
}