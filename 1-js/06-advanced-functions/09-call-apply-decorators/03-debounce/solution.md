```js demo
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

```

Виклик `debounce` повертає обгортку. Коли він викликається, він відкладає виклик оригінальної функції після даного `ms` і скасовує попередній подібний тайм-аут.

