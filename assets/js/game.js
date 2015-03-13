function Game(players) {
  this.$battlefield = $('#battlefield');
  this.$scoreboard = $("#scoreboard");
  this.gravity = 1.2;
  this.players = players;
  this.platforms = [];
}

Game.prototype.loop = function() {
  var that = this;
  this.players.forEach(function(player) {
    player.move();
    player.dead();
    that.scoreUpdate(player);
    that.winner(player);
    that.roundMap(player);
    that.jumping(player);
    view.updateDisplay(player);
    if (player.jumping === false) {
      that.findGroundUnderPlayer(player);
    }
  });
}

Game.prototype.inRange = function(attacker, recievers) {
  return recievers.filter(function(reciever) {
    return ((attacker.x < reciever.x) && attacker.facing == "right" && Math.abs(attacker.x - reciever.x) < 50) && (attacker.y - reciever.y) < 7 || ((attacker.x > reciever.x) && attacker.facing == "left" && Math.abs(attacker.x - reciever.x) < 50) && (attacker.y - reciever.y) < 7
  })
}

Game.prototype.jumping = function(player) {
  if (player.jumping) {
    view.updateGif(player, "jump");
    player.yVel += this.gravity
    player.y += player.yVel;
    // when player hits ground
    if (player.y > this.findGroundUnderPlayer(player)) {
      player.yVel = 0;
      player.y = this.findGroundUnderPlayer(player);
      player.jumping = false;
      player.setDirection(player.facing);
    }
  }
}

Game.prototype.initDisplay = function() {
  var that = this;
  this.players.forEach(function(player) {
    player.$sprite = $("<div class='player'></div>").css('background-image', player.sprite.standRight);
    that.$battlefield.append(player.$sprite);
    that.$scoreboard.append('<li class="scores" id="' + player.character + '"></li>');
  });
}