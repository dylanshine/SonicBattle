function View() {

};

View.prototype.updateDisplay = function(player) {
  player.$sprite.css('top', player.y);
  player.$sprite.css('left', player.x);
}