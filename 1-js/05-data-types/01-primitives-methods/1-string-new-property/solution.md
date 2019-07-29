
Спробуйте запустити:

```js run
let str = "Привіт";

str.test = 5; // (*)

alert(str.test);
```

В залежності від того, втановлений у вас `use strict` чи ні, результати будуть наступними:
1. `undefined` (без строгого режиму)
2. Помилка (строгий режим)

Чому? Давайте повторимо те, що відбувається в рядку, який позначено `(*)`:

<<<<<<< HEAD
1. Коли ми намагаємося отримати доступ до `str`, створюється "об'єкт обгортка".
2. В строгому режимі, спроба запису викличе помилку.
3. В іншому випадку, операція здійсниться і об'єкт отримає властивість `test`, але після цього "об'єкт обгортка" зникне.

Отже, якщо код виконується не в строгому режимі, на останньому рядку `str` не матиме властивості `test`. 
=======
1. When a property of `str` is accessed, a "wrapper object" is created.
2. In strict mode, writing into it is an error.
3. Otherwise, the operation with the property is carried on, the object gets the `test` property, but after that the "wrapper object" disappears, so in the last line `str` has no trace of the property.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

**Цей приклад чітко показує, що примітиви не є об'єктами.**

Вони не можуть зберігати додаткові данні.
