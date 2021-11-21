```js run demo
function filterRange(arr, a, b) {
  // навколо виразу додано дужки для кращої читабельності
  return arr.filter(item => (a <= item && item <= b));
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert( filtered ); // 3,1 (відфільтровані значення)

alert( arr ); // 5,3,8,1 (не змінюється)
```
