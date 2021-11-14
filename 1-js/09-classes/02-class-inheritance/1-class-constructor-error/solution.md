Це тому, що конструктор дочірнього классу повинен викликати `super()`.

Ось правильний код:

```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {  
    *!*
    super(name);
    */!*
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("Білий кролик"); // зараз добре
*/!*
alert(rabbit.name); // Білий кролик
```
