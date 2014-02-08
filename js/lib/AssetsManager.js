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

  AssetsManager.prototype.getTexture = function(name) {
    return  this._textures[name];
  }

  return AssetsManager;
})