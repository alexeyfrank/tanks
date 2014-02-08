define(function(require) {
  var Entities = require('game/Entities');

  function World() {
    this.terrain = new Entities.Terrain();
    this.tanks = [];
    this.bullets = [];
  }

  World.prototype.create = function() {
    this._scene = new THREE.Scene();
  }

  World.prototype.update = function() {}
  World.prototype.draw = function() {}
  World.prototype.updateState = function() {}
  World.prototype.setAssetsManager = function() {}


  return World;
})