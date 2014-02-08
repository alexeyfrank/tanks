require(['lib/Game', 'game/World'], function(Game, World) {

  var world = new World({
    gameContainer: document.getElementById('game-container'),
    width: 1024,
    height: 768
  });

  function repeatedTx(texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);
    return texture;
  }

  function noopTx(t) {return t;}

  var game = new Game({
    preloadAssets: function(assetsManager) {
      assetsManager.loadTexture('terrain', '../textures/terrain.jpg', repeatedTx);
      assetsManager.loadTexture('skybox', '../textures/tank.jpg', noopTx);
      assetsManager.loadTexture('tank', '../textures/tank.jpg', noopTx);

      var promise = Q.all([
        assetsManager.loadModel('tank_base', '../models/tank_base.json'),
        assetsManager.loadModel('bullet', '../models/bullet.json')
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
