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
    this.receiveWorldMessage = opts.receiveWorldMessage;
    this.receiveTankMessage = opts.receiveTankMessage;

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
      var message = JSON.parse(event.data)

      if(message.Message) {
        console.log(message.Message)
      }

      switch(message["Type"]){
        case "World":
          self.receiveWorldMessage(message)
        break;

        case "Tank":
          self.receiveTankMessage(message);
          self.initGameControls()
          break;

        default:
          break;
      }

    }

  };

  Game.prototype.initGameControls = function() {
    key('up', function(event){
      event.preventDefault()
      this.sendTankCommand({LeftMotor:1, RightMotor: 1})
    }.bind(this))
  }

  Game.prototype.sendTankCommand = function(command) {
    command.Type = "TankCommand"
    this.sendMessage(command)
  }

  Game.prototype.sendMessage = function(message) {
    message = JSON.stringify( message );

    console.log("Sending to server :" + message)

    this.socket.send( message );
  };

  Game.prototype.setOptions = function(opts) {
    this.options = opts;
  }

  Game.prototype.stop = function() {
    this._gameState = GameState.STOPPED;
  };

  return Game;
});
