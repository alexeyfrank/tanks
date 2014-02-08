define(function(require) {
  function AssetsManager() {
    this._textures = {};
    this._jsonLoader = new THREE.JSONLoader();
    this._meshes = {};
    this._currentlyLoadingModel = "";
    this._texturePath = "../../textures";
    this._isModelLoading = false;
  }

  AssetsManager.prototype.loadTexture =function(name, path) {
    var texture = THREE.ImageUtils.loadTexture(path);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);

    this._textures[name] = texture;
  }

  AssetsManager.prototype.loadModelCallback = function( geometry, materials )
    {
        var material = new THREE.MeshFaceMaterial( materials );
        var mesh = new THREE.Mesh( geometry, material );
        this._world.getScene().add( mesh );
        this._meshes[this._currentlyLoadingModel] = mesh;
        this._isModelLoading = false;
    }

  AssetsManager.prototype.wait = function()
  {
      if(!this._isModelLoading)
        return;
  }

  AssetsManager.prototype.loadModel =function(modelName, world) {
      this._currentlyLoadingModel = modelName;
      this._world = world;
      this._isModelLoading = true;
      this._jsonLoader.load( modelName, this.loadModelCallback, this._texturePath );
      this.setInterval(this.wait(), 10);
  }

  AssetsManager.prototype.getModel -function(name) {
      if(!this._meshes[name].isNull)
        return this._meshes[name];
  }

  AssetsManager.prototype.getTexture = function(name) {
    return  this._textures[name];
  }

  return AssetsManager;
})