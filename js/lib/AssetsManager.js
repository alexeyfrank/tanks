define(function(require) {
  function AssetsManager() {
    this._textures = {};
  }

  AssetsManager.prototype.loadTexture =function(name, path) {
    var texture = THREE.ImageUtils.loadTexture(path);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);

    this._textures[name] = texture;
  }

  AssetsManager.prototype.addModelCallback = function( geometry, materials )
    {
        var material = new THREE.MeshFaceMaterial( materials );
        var mesh = new THREE.Mesh( geometry, material );
        this._world.getScene().add( mesh );
    }

  AssetsManager.prototype.beginLoadModel =function(modelName, world) {
      this._world = world;
      var jsonLoader = new THREE.JSONLoader();
      jsonLoader.load( modelName, this.addModelCallback );
  }

  AssetsManager.prototype.getTexture = function(name) {
    return  this._textures[name];
  }

  return AssetsManager;
})