define(function(require) {
  function Bullet(data, assetsManager) {
    this._data = data;

    var model = assetsManager.getModel('bullet');
    this.mesh = new THREE.Mesh(model.geometry, model.material);
    this.mesh.rotation.y = Math.PI / 2;
    this.mesh.scale.x = 5; // SCALE
    this.mesh.scale.y = 5; // SCALE
    this.mesh.scale.z = 5; // SCALE
  }

  Bullet.prototype.setData = function(data) {
    this._data = data;
  }

  Bullet.prototype.update = function(frame) {
    this.mesh.position.x = this._data.x;
    this.mesh.position.y = this._data.y;
    this.mesh.position.z = 2;

    this.mesh.rotation.z = this._data.rotation * Math.PI/180;

  }

  return Bullet;
})
