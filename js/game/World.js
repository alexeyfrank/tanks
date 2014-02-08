define(function(require) {
  var Object3D = require('lib/Object3D');

  function World() {
    this.terrain = new Object3D();
    this.tanks = [];
    this.bullets = [];
  }

  World.prototype.update = function() {}
  World.prototype.draw = function() {}
  World.prototype.updateState = function() {}
  World.prototype.setAssetsManager = function() {}


  return World;
})