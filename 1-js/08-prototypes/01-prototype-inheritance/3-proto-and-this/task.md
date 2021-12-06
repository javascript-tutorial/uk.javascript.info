importance: 5

---

# Де буде записано?

Ми маємо об’єкт `rabbit`, котрий успадковує властивості від об’єкта `animal`.

Якщо ми викличемо `rabbit.eat()`, у який з об’єктів буде записана властивість `full`: в `animal` чи `rabbit`?

```js
let animal = {
  eat() {
    this.full = true;
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.eat();
```
