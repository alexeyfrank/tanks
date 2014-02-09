define(function(require) {
  function Foresight() {
    var material = new THREE.LineBasicMaterial({ color: 0x0000ff });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(2000, 0, 0));

    this.mesh = new THREE.Line(geometry, material);
  }


  Foresight.prototype.updateFromPlayer = function(player) {
    this.mesh.position.x = player.towerMesh.position.x;
    this.mesh.position.y = player.towerMesh.position.y;
    this.mesh.position.z = player.towerMesh.position.z;

    this.mesh.rotation.x = player.towerMesh.rotation.x;
    this.mesh.rotation.y = player.towerMesh.rotation.y;
    this.mesh.rotation.z = player.towerMesh.rotation.z;
  }


  return Foresight;
})
