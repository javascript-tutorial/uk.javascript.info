importance: 5

---

# Перепишіть конструкцію "switch" в аналогічну з використанням "if"

Напишіть код з використанням `if..else` та відповідає наступному в конструкції `switch`:

```js
switch (browser) {
  case 'Edge':
    alert( "You've got the Edge!" );
    break;

  case 'Chrome':
  case 'Firefox':
  case 'Safari':
  case 'Opera':
    alert( 'Ми підтримуємо і ці браузери' );
    break;

  default:
    alert( 'Маємо надію, що ця сторінка виглядає добре!' );
}
```

