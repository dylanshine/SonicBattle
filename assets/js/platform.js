function Platform(height, width, left, id) {
  this.height = height;
  this.width = width;
  this.bottom = 0;
  this.right = left + width;
  this.left = left;
  this.id = id;
};