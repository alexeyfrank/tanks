define(function(require) {
  function Tank(data, assetsManager) {
    this._data = data;

    var model = assetsManager.getModel('tank_base');
    this.mesh = new THREE.Mesh(model.geometry, model.material);
    this.mesh.rotateY(Math.PI / 2);

  }

  Tank.prototype.setData = function(data) {
    this._data = data;
  }

  Tank.prototype.update = function(frame) {
    this.mesh.position.x = this._data.x;
    this.mesh.position.y = this._data.y;
    this.mesh.position.z = 5;

    this.mesh.rotation.z = this._data.rotation * Math.PI/180;
  }

  return Tank;
})
