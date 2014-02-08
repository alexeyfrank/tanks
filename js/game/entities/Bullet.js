define(function(require) {
  function Bullet(data) {
    this._data = data;

    var geometry = new THREE.CubeGeometry(1,1,1);
    var material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
    this.mesh = new THREE.Mesh(geometry, material);
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
