require(['lib/game', 'game/World'], function(Game, World) {

  var world = new World();

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
    }
  });

  game.setOptions({
    id: window.location.hash.slice(1, 10),
    container: 'game-container',
    width: 600,
    height: 600
  });

  game.run();
});
