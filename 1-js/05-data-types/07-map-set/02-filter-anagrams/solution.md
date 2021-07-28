Щоб знайти всі анаграми, давайте розіб'ємо кожне слово на літери і відсортуємо їх, а потім об'єднаємо масив знову в рядок. Після цього всі анаграми будуть однакові.

Наприклад:

```
nap, pan -> anp
ear, era, are -> aer
cheaters, hectares, teachers -> aceehrst
...
```

Ми будемо використовувати відсортовані рядки як ключі в колекції Map, для того щоб зіставити кожному ключу тільки одне значення:

```js run
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // розділіть слово на літери, відсортуйте їх та знову з'єднайте
*!*
    let sorted = word.toLowerCase().split('').sort().join(''); // (*)
*/!*
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```

Сортування літер здійснюється ланцюжком викликів одним рядком `(*)`.

Для зручності давайте розіб'ємо на декілька рядків:

```js
let sorted = word // PAN
  .toLowerCase() // pan
  .split('') // ['p','a','n']
  .sort() // ['a','n','p']
  .join(''); // anp
```

Два різних слова `'PAN'` і `'nap'` приймають ту ж саму форму після сортування букв - `'anp'`.

Наступна лінія поміщає слово в об'єкт `Map`:

```js
map.set(sorted, word);
```

Якщо ми коли-небудь ще зустрінемо слово в тій же відсортованої формі, тоді це слово перезапише значення з тим же ключем в об'єкті. Таким чином, декільком словами у нас буде завжди відповідати одна відсортована форма.

Врешті-решт `Array.from(map.values())` приймає значення об'єкта-ітератора 'Map' (в цьому випадку нам не потрібні ключі) і повертає їх у вигляді масиву.

Тут ми також можемо використовувати звичайний об'єкт замість `Map`, тому що ключі - це рядки.

Ось один з варіантів рішень задачі:

```js run demo
function aclean(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }

  return Object.values(obj);
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```
