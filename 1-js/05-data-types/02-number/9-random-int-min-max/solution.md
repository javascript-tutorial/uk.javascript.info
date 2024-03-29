# Просте, але неправильне рішення

Найпростішим, але неправильним рішенням буде генерувати значення від `min` до `max` і округляти його:

```js run
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min); 
  return Math.round(rand);
}

alert( randomInteger(1, 3) );
```

Функція працює, але вона неправильна. Ймовірність отримати граничні значення `min` і `max` в два рази менше, ніж будь-які інші.

Якщо ви запускаєте приклад вище, багато разів, ви легко побачите, що `2` з’являється найчастіше.

Це відбувається тому, що `Math.round()` отримує випадкові числа з інтервалу `1..3` і округляє їх так:

```js no-beautify
values from 1    ... to 1.4999999999  become 1
values from 1.5  ... to 2.4999999999  become 2
values from 2.5  ... to 2.9999999999  become 3
```

Тепер ми можемо чітко бачити, що `1` генерується вдвічі рідше ніж `2`. І те саме з `3`.

# Правильне рішення

Існує багато правильних рішень задачі. Один з них - коригування інтервальних меж. Щоб забезпечити однакові інтервали, ми можемо генерувати значення від `0.5 до 3.5`, тим самим додаючи необхідні ймовірності до граничних значеннь:

```js run
*!*
function randomInteger(min, max) {
  // тепер rand від (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Альтернативним способом може бути використання `Math.floor` для випадкового числа від `min` до `max + 1`:

```js run
*!*
function randomInteger(min, max) {
  // тепер rand від min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Тепер усі інтервали відображаються таким чином:

```js no-beautify
values from 1  ... to 1.9999999999  become 1
values from 2  ... to 2.9999999999  become 2
values from 3  ... to 3.9999999999  become 3
```

Всі інтервали мають однакову довжину, що робить остаточний розподіл рівномірним.
