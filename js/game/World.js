define(function(require) {
  var Entities = require('game/Entities');

  function World(config) { this._config = config; }

  World.prototype.create = function() {
    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera( 75, this._config.width / this._config.height, 0.1, 2000 );
    this._clock = new THREE.Clock();

    //this._camera.rotation.x = Math.PI / 2;

    window.c = this._camera;
    //this._controls = new THREE.FirstPersonControls( this._camera );

    this._renderer = new THREE.WebGLRenderer();

    this._renderer.setSize( this._config.width, this._config.height );

    this._config.gameContainer.appendChild(this._renderer.domElement);

    var axisHelper = new THREE.AxisHelper( 50 );
    this._scene.add( axisHelper );


    this._terrain = new Entities.Terrain({
      width: this._config.width,
      height: this._config.height,
      assetsManager: this._assetsManager
    });

    this._skybox = new Entities.Skybox({
      width: this._config.width,
      height: this._config.height,
      assetsManager: this._assetsManager
    })

    this._scene.add(this._terrain.mesh);
    this._scene.add(this._skybox.mesh);

    this.tanks = {};
    this.bullets = {};
  }

  World.prototype.update = function(frame) {
    _.forIn(this.tanks, function(tank, id) {
      tank.update(frame);
      if (this._id && id == this._id) {
        this.updateCameraForPlayer(tank);
      }
    }, this);
    _.forIn(this.bullets, function(bullet, id) {
      bullet.update(frame)
    }, this);
  };

  World.prototype.draw = function(frame) {
    //TODO: Draw HUD
    this._renderer.render(this._scene, this._camera);
  };

  World.prototype.updateState = function(newState) {
    this.updateTanksState(newState.Tanks)
    this.updateBulletsState(newState.Bullets)
  }

  World.prototype.updateBulletsState = function(bullets) {
    bullets.forEach(function(item){

     var newData = {
        x: item.Coords.Y,
        y: item.Coords.X,
        rotation: item.Direction
      }

      bullet = this.bullets[item.Id]
      if(bullet){
        bullet.setData(newData);
      } else {
        bullet = new Entities.Bullet(newData, this._assetsManager);
        this.bullets[item.Id] = bullet;
        this._scene.add(bullet.mesh);
      }

    }.bind(this))

  }

  World.prototype.updateTanksState = function(tanks) {
    tanks.forEach(function(item){
      var newData = {
        x: item.Coords.Y,
        y: item.Coords.X,
        rotation: item.Direction
      }

      var tank = this.tanks[item.Id];
      if(tank){
        tank.setData(newData);
      } else {
        tank = new Entities.Tank(newData, this._assetsManager);
        this.tanks[item.Id] = tank;
        this._scene.add(tank.mesh);
      }
    }.bind(this))
  }

  World.prototype.updateCameraForPlayer = function(tank) {
    //var delta = this._clock.getDelta()

    this._camera.position.x = tank.mesh.position.x;
    this._camera.position.z = tank.mesh.position.z;

    this._camera.position.y = 4;

    //this._controls.update( delta );

    this._camera.rotation.y =  tank.mesh.rotation.y - Math.PI / 2;
  }

  World.prototype.setSelfTank = function(msg) {
    this._id = msg.Tank.Id;
  }

  World.prototype.setAssetsManager = function(assetsManager) {
    this._assetsManager = assetsManager;
  }

  World.prototype.getScene = function() {
      return this._scene;
  }
  return World;
});
