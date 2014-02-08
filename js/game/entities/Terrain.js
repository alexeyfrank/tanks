define(function(require) {
  function Terrain(o) {
    var geometry = new THREE.PlaneGeometry(o.width, o.height);
    var material = new THREE.MeshBasicMaterial({ map: o.assetsManager.getTexture('terrain') });
    this.mesh = new THREE.Mesh(geometry, material);
  }

  Terrain.prototype.setData = function(data) {
    this._data = data;
  }

  Terrain.prototype.update = function(frame) {
  }

  return Terrain;
})
