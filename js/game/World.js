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
    _.forIn(this.tanks, function(tank, id) {
      tank.update(frame);
      if (this._id && id == this._id) {
        this._camera.position.x = tank.mesh.position.x - 1;
        this._camera.position.y = tank.mesh.position.y - 1;
        this._camera.position.z = 5;
      }
    }, this);
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
        this._scene.add(tank.mesh);
      } else {
        tank.setData(newData);
      }

    }.bind(this))

  }

  World.prototype.setSelfTank = function(msg) {
    this._id = msg.Tank.Id;
  }

  World.prototype.setAssetsManager = function() {}

  return World;
})
