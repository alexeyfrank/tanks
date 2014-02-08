define(function(require) {
  var Tank = require('game/entities/Tank')
  var Entities = require('game/Entities');
  var _ = require('lodash');

  function World() {
    this.terrain = new Entities.Terrain();
    this.tanks = {};
    this.bullets = [];
  }

  World.prototype.create = function() {
    this._scene = new THREE.Scene();
  }

  World.prototype.update = function() {}
  World.prototype.draw = function() {}

  World.prototype.updateState = function(newState) {

    newState.Tanks.forEach(function(item){
      var newData = {
        x: item.Coords.X,
        y: item.Coords.Y,
        rotation: item.Coords.Direction
      }

      tank = this.tanks[item.Id];

      if(_.isUndefined(tank)){
        tank = new Tank(newData);
        this.tanks[item.Id] = tank;
      } else {
        tank.updateData(newData);
      }

    }.bind(this))

  }

  World.prototype.setAssetsManager = function() {}

  return World;
})
