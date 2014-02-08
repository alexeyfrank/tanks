define(function(require) {
  var AssetsManager = require('lib/AssetsManager');

  var GameState = {
    STARTED: 1,
    STOPPED: 2
  };

  var Game = function(opts) {
    this.preloadAssets = opts.preloadAssets;
    this.update = opts.update;
    this.draw = opts.draw;

    this._assetsLoaded = false;


    this._assetsManager = new AssetsManager();
  }


  Game.prototype.run = function() {
    if (!this._assetsLoaded) {
      //TODO: Async preloading
      this.preloadAssets(this._assetsManager);
      this._assetsLoaded = true;
    }

    this._lastTime = new Date();
    this._gameState == GameState.STARTED;
    this._startGameCycle();
  }

  Game.prototype._startGameCycle = function() {
    var currentTime = new Date();
    var frame = currentTime - this._lastTime;

    this.update(frame);
    this.draw(frame);

    this._lastTime = currentTime;

    if (this._gameState == GameState.STARTED) {
      requestAnimationFrame(this._startGameCycle.bind(this));
    }
  }

  Game.prototype.stop = function() {
    this._gameState = GameState.STOPPED;
  }

  return Game;
});