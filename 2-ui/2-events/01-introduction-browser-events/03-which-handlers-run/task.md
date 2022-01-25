важливість: 5

---

# Який обробник запуститься?

У змінній `button` знаходиться кнопка. Спочатку на ній немає обробників.

Який з обробників запуститься? Що буде виведено під час кліку після виконання коду?

```js no-beautify
button.addEventListener("click", () => alert("1"));

button.removeEventListener("click", () => alert("1"));

button.onclick = () => alert(2);
```
