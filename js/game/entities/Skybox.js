define(function(require) {
  function Skybox(o) {
      this.mesh = new THREE.Mesh(
        new THREE.SphereGeometry(o.height * 2, 32, 24),
        o.assetsManager.getSkybox()
      );
  }

  return Skybox;
})
