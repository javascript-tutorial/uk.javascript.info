Коли браузер зчитує атрибут `on*`, як `onclick`, він створює обробник із його вмісту.

Для `onclick="handler()"` функція буде:

```js
function(event) {
  handler() // вміст onclick
}
```

Тепер ми бачимо, що значення, яке повертає `handler()`, не використовується і не впливає на результат.

Виправлення просте:

```html run
<script>
  function handler() {
    alert("...");
    return false;
  }
</script>

<a href="https://w3.org" onclick="*!*return handler()*/!*">w3.org</a>
```

Також ми можемо використовувати `event.preventDefault()`, наприклад:

```html run
<script>
*!*
  function handler(event) {
    alert("...");
    event.preventDefault();
  }
*/!*
</script>

<a href="https://w3.org" onclick="*!*handler(event)*/!*">w3.org</a>
```
