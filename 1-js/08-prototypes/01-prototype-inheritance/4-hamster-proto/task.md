importance: 5

---

# Чому обидва хом’ячка наситились?

Ми маємо два хом’ячка (об’єкти): `speedy` та `lazy`, які успадковують властивості від загального об’єкта `hamster`. 

Коли ми годуємо одного з них, інший також стає ситим. Але чому? Як ми можемо це виправити?

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Цей хом’ячок знайшов їжу
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Але цей також має їжу, чому? Виправте це.
alert( lazy.stomach ); // apple
```
