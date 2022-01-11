importance: 3

---

# Поясніть значення "this"

У коді нижче ми маємо намір викликати метод `obj.go()` 4 рази поспіль.

Але виклики `(1)` та `(2)` працюють по-різному ніж `(3)` і `(4)`. Чому?

```js run no-beautify
let obj, method;

obj = {
  go: function() { alert(this); }
};

obj.go();               // (1) [object Object]

(obj.go)();             // (2) [object Object]

(method = obj.go)();    // (3) undefined

(obj.go || obj.stop)(); // (4) undefined
```

