require(['lib/game'], function(Game) {

  var game = new Game({
    preloadAssets: function(assetsManager) {

    },

    update: function(frame) {
    },

    draw: function(frame) {
    },

    receiveWorldMessage: function(msg) {
      console.log(msg);
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
