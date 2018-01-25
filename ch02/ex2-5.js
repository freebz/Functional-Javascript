function Point2D(x, y) {
    this._x = x;
    this._y = y;
}



new Point2D(0, 1);

//=> {_x: 0, _y: 1}



function Point3D(x, y, z) {
    Point2D.call(this, x, y);
    this._z = z;
}



new Point3D(10, -1, 100);

//=> {_x: 10, _y: -1, _z: 100}
