importance: 5

---

# Виклик в контексті масиву

Яким буде результат? Чому?

```js
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
});

arr[2](); // ?
```
