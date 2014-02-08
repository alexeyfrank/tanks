define(function(require) {
  var Entities = require('game/Entities');

  function World(config) {
    this._config = config;

    this.terrain = new Entities.Terrain();
    this.tanks = {};
    this.bullets = [];
  }

  World.prototype.create = function() {
    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera( 75, this._config.width / this._config.height, 0.1, 1000 );

    this._renderer = new THREE.WebGLRenderer();
    this._renderer.setSize( this._config.width, this._config.height );

    this._config.gameContainer.appendChild(this._renderer.domElement);
  }

  World.prototype.update = function(frame) {
    //TODO: Update controls
  };

  World.prototype.draw = function(frame) {
    //TODO: Draw HUD
    this._renderer.render(this._scene, this._camera);
  };

  World.prototype.updateState = function(newState) {

    newState.Tanks.forEach(function(item){
      var newData = {
        x: item.Coords.X,
        y: item.Coords.Y,
        rotation: item.Coords.Direction
      }

      tank = this.tanks[item.Id];

      if(_.isUndefined(tank)){
        tank = new Entities.Tank(newData);
        this.tanks[item.Id] = tank;
      } else {
        tank.setData(newData);
      }

    }.bind(this))

  }

  World.prototype.setAssetsManager = function() {}

  return World;
})
