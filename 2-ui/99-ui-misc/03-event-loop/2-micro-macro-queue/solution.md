У консолі ми побачимо: 1 7 3 5 2 6 4.

Завдання досить просте, нам потрібно лише знати, як працюють черги мікрозадач і макрозадач.

Подивимося, що відбувається, крок за кроком.

```js
console.log(1);
// Перший рядок виконується негайно і виводить `1`.
// На даний момент черги макрозадач і мікрозадач порожні.

setTimeout(() => console.log(2));
// `setTimeout` додає зворотний виклик функції до черги макрозадач. 
// - вміст черги макрозадач:
//   `console.log(2)`

Promise.resolve().then(() => console.log(3));
// Зворотний виклик функції додається до черги мікрозадач.
// - вміст черги мікрозадач:
//   `console.log(3)`

Promise.resolve().then(() => setTimeout(() => console.log(4)));
// Зворотний виклик функції із `setTimeout(...4)` додається до мікрозадач
// - вміст черги мікрозадач:
//   `console.log(3); setTimeout(...4)`

Promise.resolve().then(() => console.log(5));
// Зворотний виклик додається до черги мікрозадач
// - вміст черги мікрозадач:
//   `console.log(3); setTimeout(...4); console.log(5)`

setTimeout(() => console.log(6));
// `setTimeout` додає зворотний виклик функції до макрозадач
// - вміст черги макрозадач:
//   `console.log(2); console.log(6)`

console.log(7);
// Негайно виводить 7.
```

Підведемо підсумки,

<<<<<<< HEAD
1. Числа `1` і `7` з’являються відразу, тому що прості виклики `console.log` не використовують жодних черг.
2. Потім, після завершення основного потоку коду, запускається черга мікрозадач.
    - Він містить команди: `console.log(3); setTimeout(...4); console.log(5)`.
    - З’являються числа `3` і `5`, а `setTimeout(() => console.log(4))` додає виклик `console.log(4)` в кінець черги макрозадач.
    - Черга макрозадач тепер така: `console.log(2); console.log(6); console.log(4)`.
3. Після того як черга мікрозадач стає порожньою, виконується черга макрозадач. І він виводить `2`, `6`, `4`.
=======
1. Numbers `1` and `7` show up immediately, because simple `console.log` calls don't use any queues.
2. Then, after the main code flow is finished, the microtask queue runs.
    - It has commands: `console.log(3); setTimeout(...4); console.log(5)`.
    - Numbers `3` and `5` show up, while `setTimeout(() => console.log(4))` adds the `console.log(4)` call to the end of the macrotask queue.
    - The macrotask queue is now: `console.log(2); console.log(6); console.log(4)`.
3. After the microtask queue becomes empty, the macrotask queue executes. It outputs `2`, `6`, `4`.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

Нарешті, маємо у консолі: `1 7 3 5 2 6 4`.
