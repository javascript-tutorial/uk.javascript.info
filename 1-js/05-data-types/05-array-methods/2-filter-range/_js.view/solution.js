
function filterRange(arr, a, b) {
  // навколо виразу додано дужки для кращої читабельності
  return arr.filter(item => (a <= item && item <= b));
}