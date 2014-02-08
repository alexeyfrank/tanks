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
    //!!!!! X -> Z
    this.mesh.position.z = -this._data.x;
    this.mesh.position.x = -this._data.y;
    this.mesh.position.y = 1;
  }

  return Tank;
})
