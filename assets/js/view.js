function View() {

};

View.prototype.updateDisplay = function(player) {
  player.$sprite.css('top', player.y);
  player.$sprite.css('left', player.x);
}

View.prototype.updateGif = function(player, action) {
  if (player[action + "ing"]) {
    switch (player.facing) {
      case "right":
        player.$sprite.css('background-image', player.sprite[action + "Right"]);
        break;
      case "left":
        player.$sprite.css('background-image', player.sprite[action + "Left"]);
        break;
    }
  }
}