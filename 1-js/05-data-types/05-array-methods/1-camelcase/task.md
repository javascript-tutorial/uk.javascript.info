importance: 5

---

# Переведіть текст виду border-left-width в borderLeftWidth

Напишіть функцію `camelize(str)`, яка перетворює такі рядки "my-short-string" в "myShortString".

Тобто дефіси видаляються, а всі слова після них починаються з великої літери.

Приклади:

```js
camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';
```

P.S. Підказка: використовуйте `split`, щоб розбити рядок на масив символів, потім переробіть все як потрібно та методом `join` зʼєднайте елементи в рядок.
