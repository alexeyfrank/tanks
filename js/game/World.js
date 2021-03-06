define(function(require) {
  var Entities = require('game/Entities');

  function World(config) { this._config = config; }

  World.prototype.create = function() {
    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 3000 );
    this._clock = new THREE.Clock();
    this.grassAnimation = false

    //this._camera.rotation.x = Math.PI / 2;

    window.c = this._camera;
    this._controls = new THREE.FirstPersonControls( this._camera );
    this._controls.lookVertical = false
    this._controls.lookSpeed = 0.2

    this._renderer = new THREE.WebGLRenderer();

    this._renderer.setSize( window.innerWidth, window.innerHeight);

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


    var grassGeometry = new THREE.PlaneGeometry( 10, 55, 5, 100 );
        grassGeometry.dynamic = true;
        grassGeometry.vertices[ 3 ].z = 1;
    this._grass = grassGeometry;

    var grassMap = THREE.ImageUtils.loadTexture( 'textures/grass_billboard.png' );
    var grassMaterial = new THREE.MeshBasicMaterial( { map: grassMap, alphaTest: 0.8, side: THREE.DoubleSide } );
    this._foresight = new Entities.Foresight();

    this._scene.add(this._terrain.mesh);
    this._scene.add(this._skybox.mesh);
    this._scene.add(this._foresight.mesh);

    var grassMeshes = []
    for ( var i = 0, l = 500; i < l; i++ ) {
      grassMeshes[i] = new THREE.Mesh( grassGeometry, grassMaterial );

      grassMeshes[i].position.x = Math.random() * this._config.width / 4 + this._config.width / 4 ;
      grassMeshes[i].position.z = Math.random() * this._config.height / 4 + this._config.height / 4;
      grassMeshes[i].position.y = 19 

      grassMeshes[i].rotation.y = Math.random() * Math.PI;
      this._scene.add( grassMeshes[i] );
    }

    for ( var i = 0, l = 500; i < l; i++ ) {
      grassMeshes[i] = new THREE.Mesh( grassGeometry, grassMaterial );

      grassMeshes[i].position.x = Math.random() * this._config.width ;
      grassMeshes[i].position.z = Math.random() * this._config.height;
      grassMeshes[i].position.y = 19

      grassMeshes[i].rotation.y = Math.random() * Math.PI;
      this._scene.add( grassMeshes[i] );
    }





    this.tanks = {};
    this.bullets = {};

//    this._assetsManager.getAudio('fight').play();
  }

  World.prototype.update = function(frame) {
    _.forIn(this.tanks, function(tank, id) {
      tank.update(frame);
      if (this._id && id == this._id) {
        this.updateCameraForPlayer(tank);
        this._foresight.updateFromPlayer(tank);
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
    var existed = [];
    bullets.forEach(function(item){

     var newData = {
        x: item.Coords.Y,
        y: item.Coords.X,
        rotation: item.Direction
      }

      var bullet = this.bullets[item.Id];
      if(bullet) {
        bullet.setData(newData);
      } else {
        bullet = new Entities.Bullet(newData, this._assetsManager);
        this.bullets[item.Id] = bullet;
        this._scene.add(bullet.mesh);
      }

      existed.push(parseInt(item.Id));
    }.bind(this))

    _.forIn(this.bullets, function(b, id) {
      if (!_.contains(existed, parseInt(id))) {
        this._scene.remove(b.mesh);
      }
    }, this);

  }

  World.prototype.updateTanksState = function(tanks) {
    var existedTanksIds = [];
    tanks.forEach(function(item){
      var newData = {
        x: item.Coords.Y,
        y: item.Coords.X,
        rotation: item.Direction,
        towerRotation: item.Gun.Direction
      }

      var tank = this.tanks[item.Id];
      if(tank){
        tank.setData(newData);
      } else {
        tank = new Entities.Tank(newData, this._assetsManager);
        this.tanks[item.Id] = tank;
        this._scene.add(tank.baseMesh);
        this._scene.add(tank.towerMesh);
      }

      existedTanksIds.push(parseInt(item.Id));
    }.bind(this))

    _.forIn(this.tanks, function(tank, id) {
      if (!_.contains(existedTanksIds, parseInt(id))) {
        this._scene.remove(tank.baseMesh);
        this._scene.remove(tank.towerMesh);
      }
    }, this);

  }

  World.prototype.updateCameraForPlayer = function(tank) {
    var delta = this._clock.getDelta()
    var time = this._clock.getElapsedTime();

    this._camera.position.x = tank.position().x -15;
    this._camera.position.z = tank.position().z;

    this._camera.position.y = 12;

    if(this.grassAnimation) {

        for ( var i = 0, il = this._grass.vertices.length / 2 - 1; i <= il; i ++ ) {
          for ( var j = 0, jl = 5, f = (il - i) / il; j < jl; j++ ) {
            if(this._grass.vertices[ jl * i + j  ])
              this._grass.vertices[ jl * i + j  ].z = f * Math.sin(time) / 2
          }
        }

        this._grass.verticesNeedUpdate = true;
    }

    this._controls.update( delta );

//    this._camera.rotation.y =  tank.rotation().y - Math.PI / 2;
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

  World.prototype.cameraRotationDiff = function() {
    var tank = this.tanks[this._id]
    var camRotation = (this._camera.rotation.y + Math.PI/2) * 180 / Math.PI
    var gunRotation = tank.gunRotation()

    var flag1 = this._camera.position.x > this._controls._targetVector.x;
    var flag2 = this._camera.position.z > this._controls._targetVector.z;

    if(!flag1 && flag2) {
      camRotation = 360 - camRotation
    }

    if(flag2 && flag1) {
      camRotation = 360 - camRotation;
    }

    var diff = camRotation - gunRotation

    if (diff > 180) {
      diff = diff - 360 
    }

    if (diff < -180) {
      diff = 360 + diff
    }

    if (diff < 1 && diff > -1) {
      diff = 0
    }

    return diff;
  }

  return World;
});
