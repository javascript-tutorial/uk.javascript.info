importance: 5

---

# Друга прив’язка

Чи можемо ми змінити `this` за допомогою додаткового прив’язування?

Який результат буде виведено?

```js no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "Іван"} ).bind( {name: "Христя" } );

f();
```

