define(function(require) {
  function Bullet(data, assetsManager) {
    this._data = data;

    var model = assetsManager.getModel('bullet');
    this.mesh = new THREE.Mesh(model.geometry, model.material);
    this.mesh.scale.x = 5; 
    this.mesh.scale.y = 5;
    this.mesh.scale.z = 5;

  }

  Bullet.prototype.setData = function(data) {
    this._data = data;
  }

  Bullet.prototype.update = function(frame) {
    this.mesh.position.x = this._data.y;
    this.mesh.position.z = this._data.x;
    this.mesh.position.y = 2;

    this.mesh.rotation.y = - this._data.rotation * Math.PI/180;

  }

  return Bullet;
})
