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