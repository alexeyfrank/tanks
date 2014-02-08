define(function(require) {
  function Skybox(o) {

      this.mesh = new THREE.Mesh(
          new THREE.CubeGeometry(o.height*2, o.height*2, o.height*2, 3, 3, 1),
          o.assetsManager.getSkybox()
      );
  }

  Skybox.prototype.setData = function(data) {
    this._data = data;
  }

  Skybox.prototype.update = function(frame) {
  }

  return Skybox;
})
