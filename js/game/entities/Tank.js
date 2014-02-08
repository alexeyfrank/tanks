define(function(require) {
  function Tank(data, assetsManager) {
    this._data = data;

    var model = assetsManager.getModel('tank_base');
    this.mesh = new THREE.Mesh(model.geometry, model.material);
    this.mesh.rotateY(Math.PI / 2);

    this.mesh.scale.x = 5; 
    this.mesh.scale.y = 5;
    this.mesh.scale.z = 5;
  }

  Tank.prototype.setData = function(data) {
    this._data = data;
  }

  Tank.prototype.update = function(frame) {
    //!!!!! X -> Z

    this.mesh.position.x = this._data.y;
    this.mesh.position.z = this._data.x;
    this.mesh.position.y = 2.5;

    this.mesh.rotation.y = - this._data.rotation * Math.PI/180;
  }

  return Tank;
})
