importance: 3

---

# Перевірте логін

Напишіть код, який запитує логін за допомогою `prompt`.

<<<<<<< HEAD
Якщо відвідувач вводить `"Admin"`, тоді запропонуйте за допомогою `prompt` ввести пароль, i якщо вхідні данні є порожнім рядком або `key:Esc` -- показати "Скасовано.", якщо це інакший рядок -- тоді покажіть "Я вас не знаю".
=======
If the visitor enters `"Admin"`, then `prompt` for a password, if the input is an empty line or `key:Esc` -- show "Canceled", if it's another string -- then show "I don't know you".
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

Пароль перевіряється наступним чином:

<<<<<<< HEAD
- Якщо він дорівнює "TheMaster", тоді покажіть "Ласкаво просимо!",
- Інший рядок -- покажіть "Неправильний пароль",
- Для порожнього рядка або введення було скасовано, покажіть "Скасовано."
=======
- If it equals "TheMaster", then show "Welcome!",
- Another string -- show "Wrong password",
- For an empty string or cancelled input, show "Canceled"
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

Схема:

![](ifelse_task.svg)

Будь ласка, використовуйте вкладені `if` блоки. Майте на увазі загальну читабельність коду.

Підказка:  передача порожнього вводу до запиту повертає порожній рядок `''`. Натискання `key:ESC` протягом запиту повертає `null`.

[demo]
