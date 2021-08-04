```js run demo
function sumSalaries(salaries) {

  let sum = 0;
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }

  return sum; // 650
}

let salaries = {
  "Іван": 100,
  "Петро": 300,
  "Марія": 250
};

alert( sumSalaries(salaries) ); // 650
```
Або ж ми можемо також отримати суму, використовуючи `Object.values` та `reduce`:

```js
// reduce перебирає масив значень salaries,
// складає їх
// і повертає результат
function sumSalaries(salaries) {
  return Object.values(salaries).reduce((a, b) => a + b, 0) // 650
}
```
