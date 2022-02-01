важливість: 5

---

# Розташуйте примітку всередині елемента (абсолютне позиціювання)

Розширте попереднє завдання <info:task/position-at-absolute>: навчіть функцію `positionAt(anchor, position, elem)` вставляти `elem` всередині `anchor`.

Нові значення для `position`:

- `top-out`, `right-out`, `bottom-out` -- працюють так само як і раніше, вони вставляють `elem` над/праворуч/під елементом `anchor`.
- `top-in`, `right-in`, `bottom-in` -- вставляють `elem` всередину елемента `anchor`, та прикріпляють його до верхнього/правого/нижнього краю.

Наприклад:

```js
// показує примітку над елементом blockquote
positionAt(blockquote, "top-out", note);

// показує примітку всередині елемента blockquote поряд з верхнім краєм
positionAt(blockquote, "top-in", note);
```

Результат:

[iframe src="solution" height="310" border="1" link]

Для початку візьміть розв'язання задачі <info:task/position-at-absolute>.
