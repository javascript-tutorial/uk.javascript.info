

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

// перевіримо це
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // показує 3 після 1 сек
```

Будь ласка, зверніть увагу: ми використовуємо `this` в `f.apply`, щоб наше декорування працювало для методів об’єкта.

Отже, якщо функція-обгортка викликається як метод об’єкта, то `this` передається до оригінального методу `f`.

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

let user = {
  name: "Іван",
  sayHi() {
    alert(this.name);
  }
}

user.sayHi = user.sayHi.defer(1000);

user.sayHi();
```
