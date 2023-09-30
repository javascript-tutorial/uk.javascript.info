importance: 5

---

# Властивість функції після прив'язки

Функції присвоєна властивість зі значенням. Чи зміниться вона після `bind`? Чому?

```js run
function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

*!*
let bound = sayHi.bind({
  name: "Іван"
});

alert( bound.test ); // що виведе функція? Чому?
*/!*
```

