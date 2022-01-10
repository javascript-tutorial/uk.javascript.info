

```js run
Function.prototype.defer = function(ms) {
  setTimeout(this, ms);
};

function f() {
  alert("Привіт!");
}

f.defer(1000); // показує "Привіт!" через 1 сек
```
