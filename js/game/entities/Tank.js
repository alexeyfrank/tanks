define(function(require) {
  function Tank(data) {
    this._data = data;
  }

  Tank.prototype.getView = function() {
    return this._view;
  }

  Tank.prototype.setData = function(data) {
    this._data = data;
  }

  Tank.prototype.update = function(frame) {
  }

  Tank.prototype.draw = function(frame) {
    this._view.move(this._state.deltaVelocity);

    this._view.rotation(this._data.rotation);
  }

  return Tank;
})
