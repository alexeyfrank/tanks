define(function(require) {
  function Tank(data) {
    this._data = data;

    var geometry = new THREE.CubeGeometry(5,5,5);
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
    this.mesh = new THREE.Mesh(geometry, material);
  }

  Tank.prototype.setData = function(data) {
    this._data = data;
  }

  Tank.prototype.update = function(frame) {
    //!!!!! X -> Z

    this.mesh.position.x = -this._data.x;
    this.mesh.position.y = -this._data.y;
    this.mesh.position.z = 5;

    this.mesh.rotation.z = ( - this._data.rotation + 180 ) * Math.PI/180;
  }

  return Tank;
})
