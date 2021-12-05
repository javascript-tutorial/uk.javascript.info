importance: 5

---

# Помилка створення екземпляра

Ось код з `Rabbit` розширює `Animal`.

На жаль, неможливо створити об’єкти `Rabbit`. Що не так? Полагодьте це.
```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {  
    this.name = name;
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("White Rabbit"); // Error: this is not defined
*/!*
alert(rabbit.name);
```
