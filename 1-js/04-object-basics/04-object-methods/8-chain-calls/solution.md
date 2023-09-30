Рішення полягає у поверненні самого об'єкта з кожного виклику функції.

```js run demo
let ladder = {
  step: 0,
  up() {
    this.step++;
*!*
    return this;
*/!*
  },
  down() {
    this.step--;
*!*
    return this;
*/!*
  },
  showStep() {
    alert( this.step );
*!*
    return this;
*/!*
  }
};

ladder.up().up().down().showStep().down().showStep(); // покаже 1, потім 0
```

Ми також можемо писати виклики функції з нових рядків. Для довгих ланцюгів коду це читабельніше:

```js
ladder
  .up()
  .up()
  .down()
  .showStep() // 1
  .down()
  .showStep(); // 0
```
