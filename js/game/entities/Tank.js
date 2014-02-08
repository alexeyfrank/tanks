define(function(require) {
  function Tank(data, assetsManager) {
    this._data = data;

    var model = assetsManager.getModel('tank_base');
    var texture = assetsManager.getTexture('tank');
    var material = new THREE.MeshBasicMaterial({map: texture });
    this.baseMesh = new THREE.Mesh(model.geometry, material);
    this.baseMesh.rotateY(Math.PI / 2);


    this.baseMesh.scale.x = 5; 
    this.baseMesh.scale.y = 5;
    this.baseMesh.scale.z = 5;

    model = assetsManager.getModel('tank_tower');
    this.towerMesh = new THREE.Mesh(model.geometry, material);
    this.towerMesh.scale.x = 5;
    this.towerMesh.scale.y = 5;
    this.towerMesh.scale.z = 5;

    this.towerMesh.rotation.y = Math.PI / 2;
  }

  Tank.prototype.setData = function(data) {
    this._data = data;
  }

  Tank.prototype.update = function(frame) {
    this.baseMesh.position.x = this._data.y;
    this.baseMesh.position.z = this._data.x;
    this.baseMesh.position.y = 2.5;

    this.towerMesh.position.x = this._data.y;
    this.towerMesh.position.z = this._data.x;
    this.towerMesh.position.y = 7;

    this.baseMesh.rotation.y = - this._data.rotation * Math.PI/180;
    this.towerMesh.rotation.y = this.baseMesh.rotation.y + (- this._data.towerRotation * Math.PI/180);
  }

  Tank.prototype.position = function() {
    return this.baseMesh.position;
  }

  Tank.prototype.rotation = function() {
    return this.baseMesh.rotation;
  }

  Tank.prototype.gunRotation = function() {
    return (this.baseMesh.rotation.y - this.towerMesh.rotation.y) * 180 / Math.PI
  }

  return Tank;
})
