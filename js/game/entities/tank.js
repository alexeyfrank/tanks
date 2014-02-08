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
    var neededCoords = new Vector2D(this._data.x, this._data.y);
    var currentCoords = new Vector2D(this._view.position());
    var distance = Vector2D.minus(neededCoords, currentCoords);
    var direction = Vector2D.normalize(distance);
    this._state.deltaVelocity = Vector2D.mul(direction, this._state.moveSpeed * frame.timeDiff);
  }

  Tank.prototype.draw = function(frame) {
    this._view.move(this._state.deltaVelocity);

    this._view.rotation(this._data.rotation);
  }

  return Tank;
})
