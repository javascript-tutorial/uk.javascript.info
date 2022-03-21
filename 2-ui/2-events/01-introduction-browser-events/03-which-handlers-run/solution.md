Відповідь: `1` і `2`.

Перший обробник спрацює, тому що він не був вилучений методом `removeEventListener`. Щоб видалити обробник, необхідно передати саме ту функцію, яка була призначена як обробник. Попри те, що код ідентичний, в `removeEventListener` передається нова, інша функція.

Щоб видалити функцію-обробник, потрібно десь зберегти посилання на неї, наприклад:

```js
function handler() {
  alert(1);
}

button.addEventListener("click", handler);
button.removeEventListener("click", handler);
```

Обробник `button.onclick` спрацює все одно. Разом з `addEventListener`.
