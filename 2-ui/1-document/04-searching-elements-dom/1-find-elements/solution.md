Є багато способів зробити це.

Ось деякі з них:

```js
// 1. Таблиця з `id="age-table"`.
let table = document.getElementById('age-table')

// 2. Всі елементи label всередині цієї таблиці
table.getElementsByTagName('label')
// або
document.querySelectorAll('#age-table label')

// 3. Перший td в цій таблиці (зі словом "Age")
table.rows[0].cells[0]
// або
table.getElementsByTagName('td')[0]
// або
table.querySelector('td')

// 4. форма з іменем "search"
// припускаємо, що в документі є лише один елемент з name="search".
let form = document.getElementsByName('search')[0]
// або безпосередньо форма
document.querySelector('form[name="search"]')

// 5. Перший input у цій формі.
form.getElementsByTagName('input')[0]
// або
form.querySelector('input')

// 6. Останній input у цій формі
let inputs = form.querySelectorAll('input') // знайти всі input
inputs[inputs.length-1] // взяти останній
```
