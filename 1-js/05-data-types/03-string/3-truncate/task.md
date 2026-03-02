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
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
```
