importance: 5

---

# Об’єкт лічильника

Тут лічильник створюється за допомогою функції конструктора.

Чи буде він працювати? Що він покаже?

```js
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // ?
alert( counter.up() ); // ?
alert( counter.down() ); // ?
```

