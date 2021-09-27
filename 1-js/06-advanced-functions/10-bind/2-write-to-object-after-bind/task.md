importance: 5

---

# Прив’язана функція як метод

Що виведе функція?

```js
function f() {
  alert( this ); // ?
}

let user = {
  g: f.bind(null)
};

user.g();
```

