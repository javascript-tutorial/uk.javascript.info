importance: 5

---

# Додайте метод "f.defer(ms)" до функцій

Додайте до прототипу всіх функцій метод `defer(ms)`, що запускає функцію після `ms` мілісекунд.

Після цього цей код повинен працювати:

```js
function f() {
  alert("Привіт!");
}

f.defer(1000); // показує "Привіт!" через 1 секунду
```
