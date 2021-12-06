
Безумовно, він буде чудово працювати.

Обидві вкладені функції створюються в межах єдиного зовнішнього лексичного середовища, тому вони мають спільний доступ до однієї змінної `count`:

```js run
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

alert( counter.up() ); // 1
alert( counter.up() ); // 2
alert( counter.down() ); // 1
```
