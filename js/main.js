require(['lib/Game', 'game/World'], function(Game, World) {

  var world = new World({
    gameContainer: document.getElementById('game-container'),
    width: 1024,
    height: 768
  });


  var game = new Game({
    preloadAssets: function(assetsManager) {
      //TODO: load assets
      assetsManager.loadTexture('terrain', '../textures/terrain.jpg');

      var promise = Q.all([
        assetsManager.loadModel('tank_base', '../models/tank_base.js')
      ]);

      world.setAssetsManager(assetsManager);
      world.create();

      return promise;
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
