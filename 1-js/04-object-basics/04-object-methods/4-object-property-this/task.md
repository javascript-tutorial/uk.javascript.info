importance: 5

---

# Використання "this" в об’єктному літералі

Тут функція `makeUser` повертає об’єкт.

Який результат доступу до його `ref`? Чому?

```js
function makeUser() {
  return {
    name: "Іван",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Який результат?
```

