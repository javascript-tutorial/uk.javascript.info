importance: 4

---

# Який день місяця був багато днів тому?

Створіть функцію `getDateAgo(date, days)`, щоб повернути день місяця, який був `days` днів після `date`.

Наприклад, якщо сьогодні -- 20-й, то `getDateAgo(new Date(), 1)` має бути 19-го, а `getDateAgo(new Date(), 2)` має бути 18-го.

Має працювати надійно для `days = 365` або більше:

```js
let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 січня 2015)
alert( getDateAgo(date, 2) ); // 31, (31 грудня 2014)
alert( getDateAgo(date, 365) ); // 2, (2 січня 2014)
```

P.S. Функція не повинна змінювати `date`.
