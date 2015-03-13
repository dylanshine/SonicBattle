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

Game.prototype.scoreUpdate = function() {
  this.players.forEach(function(player) {
    $(player.scoreId).text(player.character + " | " + "score " + player.score + " " + "health " + player.health + " " + "energy " + player.energy);
  });
}

Game.prototype.winner = function() {
  this.players.forEach(function(player) {
    if (player.score === 10) {
      alert(player.character + " wins!")
      document.location.reload(true);
    }
  });
}

Game.prototype.hit = function(player) {
  var otherPlayers = this.players.filter(function(p) {
    return p !== player
  })

  var nearPlayers = game.inRange(player, otherPlayers)

  nearPlayers.forEach(function(reciever) {
    if (reciever.blocking === true && reciever.shield() === true) {
      player.health -= .25;
    } else {
      reciever.health -= 1;
      reciever.tag = player;
    }
  });
}

Game.prototype.recharge = function() {
  this.players.forEach(function(player) {
    if (!player.blocking && player.energy < 15) {
      player.energy += 1;
    }
    if (player.health < 20) {
      player.health += 1;
    }
  });
}

Game.prototype.roundMap = function(player) {
  if (player.x < 2) {
    player.x = 729;
  }

  if (player.x > 730) {
    player.x = 3;
  }
}

Game.prototype.grabPlatforms = function() {
  var that = this;
  $(".platform").each(function(index, element) {
    element = $(element)
    that.platforms.push(new Platform(element.height(), element.width(), element.offset().left, element.attr("id")))
  });
}

Game.prototype.findGroundUnderPlayer = function(player) {
  var that = this;
  var underPlayer = this.platforms.filter(function(platform) {
    return (platform.left <= player.x && player.x <= platform.right)
  })[0];

  if ((underPlayer.id == "water1" || underPlayer.id == "water2") && player.jumping == false) {
    player.falling = true;
    view.updateGif(player, "fall");
    player.y += 9;
  }

  if (player.y >= 406) {
    player.health = 0;
  }

  if (player.jumping === false) {} else if (underPlayer.id !== "water1" && underPlayer.id !== "water2") {
    return this.$battlefield.height() - underPlayer.height - 32;
  }

}

$(document).ready(function() {
  game = new Game(
    [
      new Player("sonic", {
        "left": "a",
        "right": "d",
        "jump": 87,
        "attack": 81,
        "block": "s"
      }),
      new Player("tails", {
        "left": "j",
        "right": "l",
        "jump": 73,
        "attack": 85,
        "block": "k"
      }),
      new Player("knuckles", {
        "left": "j",
        "right": "l",
        "jump": 73,
        "attack": 85,
        "block": "k"
      })

    ]);
  view = new View();
  game.initDisplay();
  game.grabPlatforms();
  setInterval(function() {
    game.loop();
  }, 20);

  setInterval(function() {
    game.recharge();
  }, 2000);


  //Player Controls
  game.players.forEach(function(player) {
    ["left", "right"].forEach(function(direction) {
      Mousetrap.bind(player.controls[direction], function() {
        player.walking = true;
        player.setDirection(direction);
      }, 'keydown');
      Mousetrap.bind(player.controls[direction], function() {
        player.walking = false;
        player.setDirection(direction);
      }, 'keyup');
    });

    $(document).keydown(function(event) {
      if (event.which == player.controls.jump) {
        event.preventDefault();
        player.jump();
      }
    });

    $(document).keydown(function(event) {
      if (event.which == player.controls.attack) {
        event.preventDefault();
        if (player.attacking) {
          return;
        }
        player.attacking = true;
        view.updateGif(player, "attack");
        game.hit(player);
      }
    });

    $(document).keyup(function(event) {
      if (event.which == player.controls.attack) {
        event.preventDefault();
        player.attacking = false;
        player.setDirection(player.direction);
      }
    });

    Mousetrap.bind(player.controls.block, function() {
      player.shield();
      view.updateGif(player, "block");
    }, 'keydown');

    Mousetrap.bind(player.controls.block, function() {
      player.blocking = false;
      player.setDirection(player.direction);
    }, 'keyup');

  });
});