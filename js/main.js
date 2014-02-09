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
      assetsManager.loadSkybox();

//      assetsManager.loadAudio('fight', '../audio/fight.mp3');

      return Q.all([
        assetsManager.loadModel('tank_base', '../models/tank_base.json'),
        assetsManager.loadModel('tank_tower', '../models/tank_tower.json'),
        assetsManager.loadModel('bullet', '../models/bullet.json'),
        assetsManager.loadModel('terrainModel', '../models/terrain.json')
      ]).then(function(){
        world.setAssetsManager(assetsManager);
        world.create();
      });
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
    },

    receiveHitMessage: function(msg) {
      document.getElementById('game-overlay').style.opacity = 1;
    },

    getCameraDiffRotation: function() {
      return world.cameraRotationDiff()
    }
  });

  game.setOptions({
    id: window.location.hash.slice(1, 10)
  });

  game.run();

  window.g = game;
});
