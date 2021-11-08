
Перший виклик має `this == rabbit`, інші мають `this` рівний `Rabbit.prototype`, тому що це об’єкт перед крапкою.

Таким чином тільки перший виклик покаже `Кріль`, інші покажуть `undefined`:

```js run
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert( this.name );
}

let rabbit = new Rabbit("Кріль");

rabbit.sayHi();                        // Кріль
Rabbit.prototype.sayHi();              // undefined
Object.getPrototypeOf(rabbit).sayHi(); // undefined
rabbit.__proto__.sayHi();              // undefined
```
