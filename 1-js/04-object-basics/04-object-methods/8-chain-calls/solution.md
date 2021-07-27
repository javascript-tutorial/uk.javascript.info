Рішення полягає у поверненні самого об’єкта з кожного виклику функції.

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

ladder.up().up().down().up().down().showStep(); // 1
```

Ми також можемо написати один виклик функції на кожну лінію коду. Для довгих ланцюгів коду це читабельніше:

```js
ladder
  .up()
  .up()
  .down()
  .up()
  .down()
  .showStep(); // 1
```
