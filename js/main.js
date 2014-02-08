require(['lib/game', 'game/World'], function(Game, World) {

  var world = new World({
    gameContainer: document.getElementById('game-container'),
    width: 1280,
    height: 1024
  });

  world.create();

  var game = new Game({
    preloadAssets: function(assetsManager) {
      //TODO: load assets

      world.setAssetsManager(assetsManager);
    },

    update: function(frame) {
      world.update(frame);
    },

    draw: function(frame) {
      world.draw(frame);
    },

    receiveWorldMessage: function(msg) {
      world.updateState(msg);
    },

    receiveTankMessage: function(msg) {
      world.setSelfTank(msg);
    }
  });

  game.setOptions({
    id: window.location.hash.slice(1, 10)
  });

  game.run();
});
