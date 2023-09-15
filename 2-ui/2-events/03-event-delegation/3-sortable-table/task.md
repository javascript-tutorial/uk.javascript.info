importance: 4

---

# Sortable table

Make the table sortable: clicks on `<th>` elements should sort it by corresponding column.

Each `<th>` has the type in the attribute, like this:

```html
<table id="grid">
  <thead>
    <tr>
*!*
      <th data-type="number">Вік</th>
      <th data-type="string">Ім'я</th>
*/!*
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>5</td>
      <td>Іван</td>
    </tr>
    <tr>
      <td>12</td>
      <td>Ганна</td>
    </tr>
    ...
  </tbody>
</table>
```

У наведеному вище прикладі перший стовпець містить числа, а другий -- рядки. Функція сортування повинна обробляти сортування відповідно до типу.

Повинні підтримуватися лише типи `"string"` та `"number"`.

Робочий приклад:

[iframe border=1 src="solution" height=190]

P.S. Таблиця може бути великою, з будь-якою кількістю рядків і стовпців.
