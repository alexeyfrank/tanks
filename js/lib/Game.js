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
    this.receiveHitMessage = opts.receiveHitMessage;
    this.getCameraDiffRotation = opts.getCameraDiffRotation;

    this._assetsLoaded = false;


    this._assetsManager = new AssetsManager();
  }


  Game.prototype.run = function() {
    this.preloadAssets(this._assetsManager).then(function() {
      this._lastTime = new Date();
      this._gameState = GameState.STARTED;
      this._startBackendCycle();
      this._startGameCycle();
    }.bind(this));
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

    this.socket = new WebSocket("ws://192.168.0.71:9000/ws")

    this.socket.onmessage = function ( event ) {
      var message = JSON.parse(event.data)

//      if(message.Message) {
//        console.log(message.Message)
//      }

      switch(message["Type"]){
        case "World":
          self.receiveWorldMessage(message)
        break;

        case "Tank":
          self.receiveTankMessage(message);
          self.initGameControls()
          self.initTurrelMouse()
          break;

        case "Hit":
          self.receiveHitMessage(message);
          break;

        default:
          break;
      }

    }

  };

  Game.prototype.rotateGun = function(val) {
      this.sendTankCommand({Gun: {TurnAngle: val}})
  };

  Game.prototype.initTurrelMouse = function() {
    setInterval(function(){
      var diff = this.getCameraDiffRotation()
      this.rotateGun(diff)
    }.bind(this), 100)
  }

  Game.prototype.initGameControls = function() {

    var keys = {

      'up': { left: 1, right:1, repeat: false },
      'down': { left: -1, right: -1, repeat: false },
      'left': { left: -0.5, right: 0.5, repeat: false },
      'right': { left: 0.5, right: -0.5, repeat: false },

      'w': { left: 1, right:1, repeat: false },
      's': { left: -1, right: -1, repeat: false },
      'a': { left: -0.5, right: 0.5, repeat: false },
      'd': { left: 0.5, right: -0.5, repeat: false }

    }

    var allKeys = Object.getOwnPropertyNames(keys);
    var left = 0;
    var right = 0;

    Mousetrap.bind(allKeys, function(event, keyName){
      event.preventDefault()
      if(!event.repeat && !keys[keyName].repeat){
        keys[keyName].repeat = true

        left += keys[keyName].left
        right += keys[keyName].right

        var leftReal = left
        var rightReal = right

        if(leftReal > 1) {leftReal = 1}
        if(leftReal < -1) {leftReal = -1}
        if(rightReal > 1) {rightReal = 1}
        if(rightReal < -1) {rightReal = -1}

        this.sendMotors( leftReal, rightReal )
      }
    }.bind(this), "keydown")

    Mousetrap.bind(allKeys, function(event, keyName){
      console.log(keyName, "up")
      keys[keyName].repeat = false

      event.preventDefault()

        left -= keys[keyName].left
        right -= keys[keyName].right

        var leftReal = left
        var rightReal = right

        if(leftReal > 1) {leftReal = 1}
        if(leftReal < -1) {leftReal = -1}
        if(rightReal > 1) {rightReal = 1}
        if(rightReal < -1) {rightReal = -1}

      this.sendMotors(leftReal, rightReal)
    }.bind(this), "keyup")

    Mousetrap.bind(['enter', 'space'], function(event, keyName){
      event.preventDefault()
      this.sendTankCommand({Fire: true})
    }.bind(this));

  }

  Game.prototype.sendMotors = function(left, right) {
      this.sendTankCommand({LeftMotor:left, RightMotor: right})
  }

  Game.prototype.sendTankCommand = function(command) {
    command.Type = "TankCommand"
    this.sendMessage(command)
  }

  Game.prototype.sendMessage = function(message) {
    message = JSON.stringify( message );

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
