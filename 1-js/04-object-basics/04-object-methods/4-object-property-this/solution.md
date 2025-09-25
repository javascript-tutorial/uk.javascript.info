**Відповідь: помилка.**

Спробуйте це:

```js run
function makeUser() {
  return {
    name: "Іван",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined
```

Це тому, що правила, які встановлюють `this`, не розглядають оголошення об’єкта. Важливий лише момент виклику метода.

Тут значення `this` всередині `makeUser()` є `undefined`, оскільки вона викликається як функція, а не як метод із синтаксисом "через крапку".

Значення `this` є одним для всієї функції, блоки коду та літерали об’єктів на це не впливають.

Отже, `ref: this` дійсно бере значення `this` функції.

Ми можемо переписати функцію і повернути те саме `this` зі значенням `undefined`:

```js run
function makeUser(){
  return this; // цього разу немає літерала об’єкта
}

alert( makeUser().name ); // Error: Cannot read property 'name' of undefined
```
Як бачите, результат `alert( makeUser().name )` збігається з результатом `alert( user.ref.name )` з попереднього прикладу.

Ось протилежний випадок:

```js run
function makeUser() {
  return {
    name: "Іван",
*!*
    ref() {
      return this;
    }
*/!*
  };
}

let user = makeUser();

alert( user.ref().name ); // Іван
```

Зараз це працює, оскільки `user.ref()` -- це метод. І значення `this` встановлюється для об'єкта перед крапкою `.`.
