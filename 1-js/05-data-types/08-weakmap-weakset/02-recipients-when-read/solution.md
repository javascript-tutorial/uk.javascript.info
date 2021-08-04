
Щоб зберегти дату, ми можемо використовувати `WeakMap`:

```js
let messages = [
  {text: "Привіт", from: "Іван"},
  {text: "Як справи?", from: "Іван"},
  {text: "До зустрічі", from: "Аліса"}
];

let readMap = new WeakMap();

readMap.set(messages[0], new Date(2017, 1, 1));
// об’єкт Date ми розглянемо пізніше
```
