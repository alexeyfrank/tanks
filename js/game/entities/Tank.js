define(function(require) {
  function Tank(data) {
    this._data = data;

    var geometry = new THREE.CubeGeometry(1,1,1);
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
    this.mesh = new THREE.Mesh(geometry, material);
  }

  Tank.prototype.setData = function(data) {
    this._data = data;
  }

  Tank.prototype.update = function(frame) {
    this.mesh.position.x = this._data.x;
    this.mesh.position.y = this._data.y;
    this.mesh.position.z = 0;
  }

  Tank.prototype.draw = function(frame) {
  }

  return Tank;
})
