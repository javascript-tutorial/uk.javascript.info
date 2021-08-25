
# Ітеративні об’єкти

*Ітеративні* об’єкти є узагальненням масивів. Це концепція, яка дозволяє нам зробити будь-який об’єкт придатним для використання в циклі `for..of`.

Звичайно, по масивам можна ітеруватися. Але є багато інших вбудованих об’єктів, які також можна ітерувати. Наприклад, рядки також можна ітерувати.

Якщо об’єкт технічно не є масивом, а представляє колекцію (list, set) чогось, то `for..of` - чудовий синтаксис для його обходу, тому давайте подивимося, як змусити його працювати.


## Symbol.iterator

Ми можемо легко зрозуміти концепцію ітеративних об’єктіва, зробивши її власноруч.

Наприклад, у нас є об’єкт, який не є масивом, але виглядає придатним для `for..of`.

Як, наприклад, об’єкт `range`, який представляє інтервал чисел:

```js
let range = {
  from: 1,
  to: 5
};

// Ми хочемо, щоб for..of працював:
// for(let num of range) ... num=1,2,3,4,5
```

Щоб зробити об'єкт `range` ітерабельним (і таким чином дозволити `for..of` працювати), нам потрібно додати метод до об’єкта з назвою `Symbol.iterator` (спеціальний вбудований символ саме для цього).

1. Коли `for..of` запускається, він викликає цей метод один раз (або викликає помилку, якщо цей метод не знайдено). Метод повинен повернути *ітератор* -- об’єкт з методом `next`.
2. Далі `for..of` працює *лише з поверненим об’єктом*.
3. Коли `for..of` хоче отримати наступне значення, він викликає `next()` на цьому об’єкті.
4. Результат `next()` повинен мати вигляд `{done: Boolean, value: any}`, де `done=true` означає, що ітерація завершена, інакше `value` -- це наступне значення.

Ось повна реалізація об’єкту `range` із зауваженнями:

```js run
let range = {
  from: 1,
  to: 5
};

// 1. виклик for..of спочатку викликає цю функцію
range[Symbol.iterator] = function() {

  // ...вона повертає об’єкт ітератора:
  // 2. Далі, for..of працює тільки з цим ітератором, запитуючи у нього наступні значення
  return {
    current: this.from,
    last: this.to,      

    // 3. next() викликається на кожній ітерації циклом for..of
    next() {
      // 4. він повинен повертати значення як об’єкт {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// тепер це працює!
for (let num of range) {
  alert(num); // 1, потім 2, 3, 4, 5
}
```

Будь ласка, зверніть увагу на основну особливість ітеративних об’єктів: розділення проблем.

- Сам `range` не має методу `next()`.
- Натомість інший об’єкт, так званий "ітератор", створюється за допомогою виклику `range[Symbol.iterator]()`, а його `next()` генерує значення для ітерації.

So, the iterator object is separate from the object it iterates over.

Technically, we may merge them and use `range` itself as the iterator to make the code simpler.

Like this:

```js run
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

Now `range[Symbol.iterator]()` returns the `range` object itself:  it has the necessary `next()` method and remembers the current iteration progress in `this.current`. Shorter? Yes. And sometimes that's fine too.

The downside is that now it's impossible to have two `for..of` loops running over the object simultaneously: they'll share the iteration state, because there's only one iterator -- the object itself. But two parallel for-ofs is a rare thing, even in async scenarios.

```smart header="Infinite iterators"
Infinite iterators are also possible. For instance, the `range` becomes infinite for `range.to = Infinity`. Or we can make an iterable object that generates an infinite sequence of pseudorandom numbers. Also can be useful.

There are no limitations on `next`, it can return more and more values, that's normal.

Of course, the `for..of` loop over such an iterable would be endless. But we can always stop it using `break`.
```


## String is iterable

Arrays and strings are most widely used built-in iterables.

For a string, `for..of` loops over its characters:

```js run
for (let char of "test") {
  // triggers 4 times: once for each character
  alert( char ); // t, then e, then s, then t
}
```

And it works correctly with surrogate pairs!

```js run
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, and then 😂
}
```

## Calling an iterator explicitly

For deeper understanding, let's see how to use an iterator explicitly.

We'll iterate over a string in exactly the same way as `for..of`, but with direct calls. This code creates a string iterator and gets values from it "manually":

```js run
let str = "Hello";

// does the same as
// for (let char of str) alert(char);

*!*
let iterator = str[Symbol.iterator]();
*/!*

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // outputs characters one by one
}
```

That is rarely needed, but gives us more control over the process than `for..of`. For instance, we can split the iteration process: iterate a bit, then stop, do something else, and then resume later.

## Iterables and array-likes [#array-like]

Two official terms look similar, but are very different. Please make sure you understand them well to avoid the confusion.

- *Iterables* are objects that implement the `Symbol.iterator` method, as described above.
- *Array-likes* are objects that have indexes and `length`, so they look like arrays.

When we use JavaScript for practical tasks in a browser or any other environment, we may meet objects that are iterables or array-likes, or both.

For instance, strings are both iterable (`for..of` works on them) and array-like (they have numeric indexes and `length`).

But an iterable may be not array-like. And vice versa an array-like may be not iterable.

For example, the `range` in the example above is iterable, but not array-like, because it does not have indexed properties and `length`.

And here's the object that is array-like, but not iterable:

```js run
let arrayLike = { // has indexes and length => array-like
  0: "Hello",
  1: "World",
  length: 2
};

*!*
// Error (no Symbol.iterator)
for (let item of arrayLike) {}
*/!*
```

Both iterables and array-likes are usually *not arrays*, they don't have `push`, `pop` etc. That's rather inconvenient if we have such an object and want to work with it as with an array. E.g. we would like to work with `range` using array methods. How to achieve that?

## Array.from

There's a universal method [Array.from](mdn:js/Array/from) that takes an iterable or array-like value and makes a "real" `Array` from it. Then we can call array methods on it.

For instance:

```js run
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

*!*
let arr = Array.from(arrayLike); // (*)
*/!*
alert(arr.pop()); // World (method works)
```

`Array.from` at the line `(*)` takes the object, examines it for being an iterable or array-like, then makes a new array and copies all items to it.

The same happens for an iterable:

```js
// assuming that range is taken from the example above
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (array toString conversion works)
```

The full syntax for `Array.from` also allows us to provide an optional "mapping" function:
```js
Array.from(obj[, mapFn, thisArg])
```

The optional second argument `mapFn` can be a function that will be applied to each element before adding it to the array, and `thisArg` allows us to set `this` for it.

For instance:

```js
// assuming that range is taken from the example above

// square each number
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```

Here we use `Array.from` to turn a string into an array of characters:

```js run
let str = '𝒳😂';

// splits str into array of characters
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

Unlike `str.split`, it relies on the iterable nature of the string and so, just like `for..of`, correctly works with surrogate pairs.

Technically here it does the same as:

```js run
let str = '𝒳😂';

let chars = []; // Array.from internally does the same loop
for (let char of str) {
  chars.push(char);
}

alert(chars);
```

...But it is shorter.    

We can even build surrogate-aware `slice` on it:

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

// the native method does not support surrogate pairs
alert( str.slice(1, 3) ); // garbage (two pieces from different surrogate pairs)
```


## Summary

Objects that can be used in `for..of` are called *iterable*.

- Technically, iterables must implement the method named `Symbol.iterator`.
    - The result of `obj[Symbol.iterator]()` is called an *iterator*. It handles further iteration process.
    - An iterator must have the method named `next()` that returns an object `{done: Boolean, value: any}`, here `done:true` denotes the end of the iteration process, otherwise the `value` is the next value.
- The `Symbol.iterator` method is called automatically by `for..of`, but we also can do it directly.
- Built-in iterables like strings or arrays, also implement `Symbol.iterator`.
- String iterator knows about surrogate pairs.


Objects that have indexed properties and `length` are called *array-like*. Such objects may also have other properties and methods, but lack the built-in methods of arrays.

If we look inside the specification -- we'll see that most built-in methods assume that they work with iterables or array-likes instead of "real" arrays, because that's more abstract.

`Array.from(obj[, mapFn, thisArg])` makes a real `Array` from an iterable or array-like `obj`, and we can then use array methods on it. The optional arguments `mapFn` and `thisArg` allow us to apply a function to each item.
