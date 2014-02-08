define(function(require) {
  function Skybox(o) {
    var geometry = new THREE.CubeGeometry(o.width, o.height, o.height);
    var material = new THREE.MeshBasicMaterial({
//      map: o.assetsManager.getTexture('skybox')
      color: 0x0000aa
    });

    material.side = THREE.BackSide;

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.x = o.width / 2;
    this.mesh.position.z = o.height / 2;
  }

  Skybox.prototype.setData = function(data) {
    this._data = data;
  }

  Skybox.prototype.update = function(frame) {
  }

  return Skybox;
})
