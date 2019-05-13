# Оператори порівняння

Багато з операторів порівняння нам відомі з математики:

- Більше/менше: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Більше/менше або рівне: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- Рівне: `a == b` (зверніть увагу, для порівняння потрібно використовувати два знаки рівності `=`. Один знак рівності `a = b` означало б присвоєння).
- Не рівне. В математиці позначається символом <code>&ne;</code>. В JavaScript записується як знак оклику разом із знаком рівності: <code>a != b</code>.

## Результат порівняння має логічний тип

Так само як й інші оператори, оператори порівняння повертають значення. У цьому випадку, порівняння повертає логічний тип.

- `true` -- означає "так", "правильно" або "правда".
- `false` -- означає "ні", "неправильно" або "не правда".

Наприклад:

```js run
alert( 2 > 1 );  // true (правильно)
alert( 2 == 1 ); // false (неправильно)
alert( 2 != 1 ); // true (правильно)
```

Результат порівняння можна присвоїти змінній, як і будь-яке інше значення:

```js run
let result = 5 > 4; // присвоїти результат порівняння змінній result
alert( result ); // true
```

## Порівняння рядків

Щоб визначити, чи один рядок більший за інший, JavaScript використовує так званий "алфавітний" або "лексикографічний" порядок.

Іншими словами, рядки порівнюються посимвольно.

Наприклад:

```js run
alert( 'Я' > 'А' ); // true
alert( 'Кіт' > 'Код' ); // true
alert( 'Слоненя' > 'Слон' ); // true
```

Алгоритм порівняння рядків досить простий:

1. Порівнюються перші символи обох рядків.
2. Якщо перший символ першого рядка більший (менший) за перший символ другого рядка, то перший рядок більший (менший) за другий. Порівняння закінчено.
3. В іншому випадку, якщо перші символи обох рядків рівні, то таким самим чином порівнюються вже другі символи рядків.
4. Порівняння продовжується до того часу, доки не закінчиться один з рядків.
5. Якщо два рядки закінчуються одночасно, то вони рівні. Інакше, довший рядок вважатиметься більшим.

In the examples above, the comparison `'Z' > 'A'` gets to a result at the first step while the strings `"Glow"` and `"Glee"` are compared character-by-character:

1. `G` is the same as `G`.
2. `l` is the same as `l`.
3. `o` is greater than `e`. Stop here. The first string is greater.

```smart header="Not a real dictionary, but Unicode order"
The comparison algorithm given above is roughly equivalent to the one used in dictionaries or phone books, but it's not exactly the same.

For instance, case matters. A capital letter `"A"` is not equal to the lowercase `"a"`. Which one is greater? The lowercase `"a"`. Why? Because the lowercase character has a greater index in the internal encoding table JavaScript uses (Unicode). We'll get back to specific details and consequences of this in the chapter <info:string>.
```

## Comparison of different types

When comparing values of different types, JavaScript converts the values to numbers.

For example:

```js run
alert( '2' > 1 ); // true, string '2' becomes a number 2
alert( '01' == 1 ); // true, string '01' becomes a number 1
```

For boolean values, `true` becomes `1` and `false` becomes `0`. 

For example:

```js run
alert( true == 1 ); // true
alert( false == 0 ); // true
```

````smart header="A funny consequence"
It is possible that at the same time:

- Two values are equal.
- One of them is `true` as a boolean and the other one is `false` as a boolean.

For example:

```js run
let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!
```

From JavaScript's standpoint, this result is quite normal. An equality check converts values using the numeric conversion (hence `"0"` becomes `0`), while the explicit `Boolean` conversion uses another set of rules.
````

## Strict equality

A regular equality check `==` has a problem. It cannot differentiate `0` from `false`:

```js run
alert( 0 == false ); // true
```

The same thing happens with an empty string:

```js run
alert( '' == false ); // true
```

This happens because operands of different types are converted to numbers by the equality operator `==`. An empty string, just like `false`, becomes a zero.

What to do if we'd like to differentiate `0` from `false`?

**A strict equality operator `===` checks the equality without type conversion.**

In other words, if `a` and `b` are of different types, then `a === b` immediately returns `false` without an attempt to convert them.

Let's try it:

```js run
alert( 0 === false ); // false, because the types are different
```

There is also a "strict non-equality" operator `!==` analogous to `!=`.

The strict equality operator is a bit longer to write, but makes it obvious what's going on and leaves less room for errors.

## Comparison with null and undefined

Let's see more edge cases.

There's a non-intuitive behavior when `null` or `undefined` are compared to other values.


For a strict equality check `===`
: These values are different, because each of them is a different type.

    ```js run
    alert( null === undefined ); // false
    ```

For a non-strict check `==`
: There's a special rule. These two are a "sweet couple": they equal each other (in the sense of `==`), but not any other value.

    ```js run
    alert( null == undefined ); // true
    ```

For maths and other comparisons `< > <= >=`
: `null/undefined` are converted to numbers: `null` becomes `0`, while `undefined` becomes `NaN`.

Now let's see some funny things that happen when we apply these rules. And, what's more important, how to not fall into a trap with them.

### Strange result: null vs 0

Let's compare `null` with a zero:

```js run
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) *!*true*/!*
```

Mathematically, that's strange. The last result states that "`null` is greater than or equal to zero", so in one of the comparisons above it must be `true`, but they are both false.

The reason is that an equality check `==` and comparisons `> < >= <=` work differently. Comparisons convert `null` to a number, treating it as `0`. That's why (3) `null >= 0` is true and (1) `null > 0` is false.

On the other hand, the equality check `==` for `undefined` and `null` is defined such that, without any conversions, they equal each other and don't equal anything else. That's why (2) `null == 0` is false.

### An incomparable undefined

The value `undefined` shouldn't be compared to other values:

```js run
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

Why does it dislike zero so much? Always false!

We get these results because:

- Comparisons `(1)` and `(2)` return `false` because `undefined` gets converted to `NaN` and `NaN` is a special numeric value which returns `false` for all comparisons.
- The equality check `(3)` returns `false` because `undefined` only equals `null` and no other value.

### Evade problems

Why did we go over these examples? Should we remember these peculiarities all the time? Well, not really. Actually, these tricky things will gradually become familiar over time, but there's a solid way to evade problems with them:

Just treat any comparison with `undefined/null` except the strict equality `===` with exceptional care.

Don't use comparisons `>= > < <=` with a variable which may be `null/undefined`, unless you're really sure of what you're doing. If a variable can have these values, check for them separately.

## Summary

- Comparison operators return a boolean value.
- Strings are compared letter-by-letter in the "dictionary" order.
- When values of different types are compared, they get converted to numbers (with the exclusion of a strict equality check).
- The values `null` and `undefined` equal `==` each other and do not equal any other value.
- Be careful when using comparisons like `>` or `<` with variables that can occasionally be `null/undefined`. Checking for `null/undefined` separately is a good idea.
