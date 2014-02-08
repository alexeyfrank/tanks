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
    this._gameState = GameState.STARTED;
    this._startBackendCycle();
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

  Game.prototype._startBackendCycle = function() {
    this._initWebsocket()
    setTimeout(function() {
      this._Authorizate()
    }.bind(this), 1000);
  }


  Game.prototype._Authorizate = function() {
    this.sendMessage({ Type:"Auth", Login: "rand", Password: "rand" })
  }

  Game.prototype._initWebsocket = function() {
    var self = this;

    this.socket = new WebSocket("ws://nox73.ru:9000/ws")

    this.socket.onmessage = function ( event ) {
      message = JSON.parse(event.data)

      switch(message["Type"]){
        case "World":
          self.receiveWorldMessage(message)
        break;

        case "Tank":
          return
        break;

        default:
          break;
      }

    }

  };

  Game.prototype.sendMessage = function(message) {
    message = JSON.stringify( message );

    this.socket.send( message );
  };

  Game.prototype.receiveWorldMessage = function(message) {
    console.log(message);
  };

  Game.prototype.setOptions = function(opts) {
    this.options = opts;
  }

  Game.prototype.stop = function() {
    this._gameState = GameState.STOPPED;
  };

  return Game;
});
