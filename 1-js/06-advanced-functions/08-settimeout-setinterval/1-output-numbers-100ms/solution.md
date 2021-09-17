
Використовуючи `setInterval`:

```js run
function printNumbers(from, to) {
  let current = from;

  let timerId = setInterval(function() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }, 1000);
}

// використання:
printNumbers(5, 10);
```

Використовуючи вкладений `setTimeout`:


```js run
function printNumbers(from, to) {
  let current = from;

  setTimeout(function go() {
    alert(current);
    if (current < to) {
      setTimeout(go, 1000);
    }
    current++;
  }, 1000);
}

// використання:
printNumbers(5, 10);
```

Зауважте, що в обох рішеннях є початкова затримка перед першим виходом. Функція викликається після `1000 мс` у перший раз.

Якщо ми також хочемо, щоб функція запускалася негайно, ми можемо додати додатковий виклик в окремому рядку, наприклад:

```js run
function printNumbers(from, to) {
  let current = from;

  function go() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }

*!*
  go();
*/!*
  let timerId = setInterval(go, 1000);
}

printNumbers(5, 10);
```
