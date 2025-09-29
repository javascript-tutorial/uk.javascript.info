importance: 5

---

# Урізання тексту

Створіть функцію `truncate(str, maxlength)`, яка перевіряє довжину `str` і, якщо вона перевищує `maxlength` -- замінює кінець `str` символом трьох крапок `"…"`, щоб його довжина була рівною `maxlength`.

Результатом функції повинен бути урізаний (якщо потребується) рядок.

Наприклад:

```js
<<<<<<< HEAD
truncate("Що я хотів би розповісти на цю тему:", 20) == "Що я хотів би розпо…"

truncate("Всім привіт!", 20) == "Всім привіт!"
=======
truncate("What I'd like to tell on this topic is:", 20) == "What I'd like to te…"

truncate("Hi everyone!", 20) == "Hi everyone!"
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
```
