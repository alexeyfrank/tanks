define(function(require) {
  function AssetsManager() {
    this._textures = {};
    this._jsonLoader = new THREE.JSONLoader();
    this._models = {};
  }

  AssetsManager.prototype.loadTexture =function(name, path, cb) {
    var texture = THREE.ImageUtils.loadTexture(path);
    this._textures[name] = cb(texture);
    this._textures[name] = texture;
  }

  AssetsManager.prototype.loadTextureCube =function(name, path, cb) {
    var texture = THREE.ImageUtils.loadTextureCube(path);
    this._textures[name] = cb(texture);
    this._textures[name] = texture;
  }

  AssetsManager.prototype.loadModelCallback = function(name, geometry, materials) {
    var material = new THREE.MeshFaceMaterial( materials );
    this._models[name] = { geometry: geometry, material: material };
  }

  AssetsManager.prototype.loadModel = function(modelName, path) {
    var defer = Q.defer();
    this._jsonLoader.load(path, function(g, m) {
      this.loadModelCallback(modelName, g, m);
      defer.resolve();
    }.bind(this), '../../textures/');

    return defer.promise;
  }

  AssetsManager.prototype.getModel = function(name) {
    return this._models[name];
  }

  AssetsManager.prototype.getTexture = function(name) {
    return  this._textures[name];
  }

  return AssetsManager;
})