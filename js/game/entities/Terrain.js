define(function(require) {
  function Terrain(o) {
    var geometry = new THREE.PlaneGeometry(o.width, o.height);
    //var model = o.assetsManager.getModel('terrainModel'); don't works
    var material = new THREE.MeshBasicMaterial({ map: o.assetsManager.getTexture('terrain') });
    this.mesh = new THREE.Mesh(geometry, material);

    this.mesh.position.x = o.width / 2;
    this.mesh.position.z = o.height / 2;

    this.mesh.rotation.x = - Math.PI/ 2
  }

  Terrain.prototype.setData = function(data) {
    this._data = data;
  }

  Terrain.prototype.update = function(frame) {
  }

  return Terrain;
})
