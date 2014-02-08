define(function(require) {
  function Skybox(o) {
    var geometry = new THREE.SphereGeometry(o.radius);
    var material = new THREE.MeshBasicMaterial({
      map: o.assetsManager.getTexture('skybox')
    });

    material.side = THREE.BackSide;

    this.mesh = new THREE.Mesh(geometry, material);
  }

  Skybox.prototype.setData = function(data) {
    this._data = data;
  }

  Skybox.prototype.update = function(frame) {
  }

  return Skybox;
})
