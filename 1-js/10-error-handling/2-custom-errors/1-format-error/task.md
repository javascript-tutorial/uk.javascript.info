importance: 5

---

# Успадкувати від SyntaxError

Створіть клас `FormatError`, який успадковується від вбудованого класу `SyntaxError`.

Він повинен підтримувати властивості `message`, `name` та `stack`.

Приклад використання:

```js
let err = new FormatError("formatting error");

alert( err.message ); // formatting error
alert( err.name ); // FormatError
alert( err.stack ); // stack

alert( err instanceof FormatError ); // true
alert( err instanceof SyntaxError ); // true (оскільки успадковується від SyntaxError)
```
