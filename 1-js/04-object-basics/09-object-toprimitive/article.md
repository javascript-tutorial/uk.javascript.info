
# Перетворення об'єктів в примітиви

Що відбувається, коли об'єкти додаються `obj1 + obj2`, віднімаються `obj1 - obj2` або друкуються за допомогою `alert(obj)`?

JavaScript не дозволяє налаштувати, як працюють оператори з об’єктами. На відміну від деяких інших мов програмування, таких як Ruby або C++, ми не можемо реалізувати спеціальний об’єктний метод для обробки додавання (або інших операторів).

У разі таких операцій об’єкти автоматично перетворюються на примітиви, а потім операція здійснюється над цими примітивами та повертає результат у вигляді примітивного значення.

Це важливе обмеження, оскільки результат `obj1 + obj2` не може бути іншим об’єктом!

Наприклад, ми не можемо зробити об’єкти, що представляють вектори або матриці (або досягнення або що завгодно) та додати їх і очікувати, що "підсумковий" результат буде об’єктом. Автоматично такі архітектурні особливослі недоступні.

Отже, так як ми не можемо автоматично за допомогою мови программування виконувати подібні операції над об’єктами, то в реальних проектах немає "математики з об’єктами". Коли стаються подібні операції (наприклад, `obj1 + obj2`), причиною цьому зазвичай є помилка программування.

У цьому розділі ми розглянему те, як об’єкти перетворюється на примітиви і як налаштувати це.

У нас є два цілі:

1. Це дозволить нам зрозуміти, що відбувається у випадку помилок коду, коли така операція відбулася випадково.
2. Є винятки, де такі операції можливі і доцільні. Наприклад, віднімання або порівняння дати (`Date` об'єкти). Ми будемо зустрічатися з ними пізніше.

## Правила перетворення

У розділі <info:type-conversions> ми бачили правила для перетворення чисел, рядків та булевих примітивів. Але ми залишили пробіл для об’єктів. Тепер, так як ми знаємо про методи та символи, можемо заповнити його.

1. Всі об'єкти - це `true` в булевому контексті. Є лише числові та рядкові конверсії.
2. Числове перетворення відбувається, коли ми віднімаємо об’єкти або застосовуємо математичні функції. Наприклад, `Date` об’єкти (розглянуті в розділі <info:date>) можуть відніматися, і результат `date1 - date2` - це різниця у часі між двома датами.
3. Що стосується перетворення рядків - це зазвичай відбувається, коли ми виводимо об'єкт, наприклад `alert(obj)` і в подібних контекстах.

Ми можемо точно налагоджувати перетворення рядків та чисел, використовуючи спеціальні методи об'єкта.

Є три варіанти перетворення типів, що відбуваються в різних ситуаціях.

Вони називаються "підказками" ("hints"), як описано в [специфікації](https://tc39.github.io/ecma262/#sec-toprimitive):

`"string"`
: Перетворення об’єкта в рядок відбувається коли ми виконуємо операцію, яка очікує рядок, над об’єктом. Наприклад, `alert`:

    ```js
    // вивід
    alert(obj);

    // використання об’єкта як ключа властивості об’єкта
    anotherObj[obj] = 123;
    ```

`"number"`
: Перетворення об’єкта в число, коли ми робимо математичні операції:

    ```js
    // явне перетворення
    let num = Number(obj);

    // математичні операції (крім бінарного додавання)
    let n = +obj; // унарне додавання
    let delta = date1 - date2;

    // порівняння менше/більше
    let greater = user1 > user2;
    ```

`"default"`
: Виникає в рідкісних випадках, коли оператор "не впевнений", який тип очікується.

    Наприклад, бінарний плюс `+` може працювати як з рядками (об’єднувати їх), так і з цифрами (додавати їх), тому обидва випадки - рядки та цифри - будуть працювати. Отже, якщо бінарний плюс отримує об’єкт як аргумент, він використовує підказку `"за замовчуванням"`, щоб перетворити його.

    ```js
    // бінарний плюс використовує підказку "за замовчуванням"
    let total = obj1 + obj2;

    // obj == цифра використовує підказку "за замовчуванням"
    if (user == 1) { ... };
    ```

    Оператори порівняння більше та менше, такі як `<` `>`, також можуть працювати як з рядками, так і з цифрами. Тим не менш, вони з історичних причин використовують `"number"` підказку, а не `"default"`.

    In practice though, we don't need to remember these peculiar details, because all built-in objects except for one case (`Date` object, we'll learn it later) implement `"default"` conversion the same way as `"number"`. And we can do the same.

```smart header="No `\"boolean\"` hint"
Будь ласка, зверніть увагу - є лише три підказки. Це просто.

There is no "boolean" hint (all objects are `true` in boolean context) or anything else. And if we treat `"default"` and `"number"` the same, like most built-ins do, then there are only two conversions.
Немає "булевої" підказки (всі об'єкти `true` у булевому контексті) або що-небудь ще. І якщо ми ставимося до `default` і `number` те ж саме, як і більшість збірних, то є лише дві конверсії.
```

** Щоб зробити перетворення, JavaScript намагається знайти та викликати три методи об'єкта: **

1. Call `obj[Symbol.toPrimitive](hint)` - the method with the symbolic key `Symbol.toPrimitive` (system symbol), if such method exists,
2. Otherwise if hint is `"string"`
    - try `obj.toString()` and `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try `obj.valueOf()` and `obj.toString()`, whatever exists.

## Symbol.toPrimitive

Почнемо з першого методу. Є вбудований символ під назвою `symbol.toPrimitive`, який слід використовувати для назви методу перетворення, як наприклад:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // тут йде код, щоб перетворити цей об'єкт в примітив
  // він повинен повернути примітивне значення
  // hint = один з "string", "number", "default"
};
```

Якщо метод `symbol.toprimitive` існує, він використовується для всіх підказок, і не потрібно більше методів.

For instance, here `user` object implements it:

```js run
let user = {
  name: "Іван",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// демо перетворення:
alert(user); // hint: string -> {name: "Іван"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

Як ми бачимо з коду, `user` стає самоописовим рядком або грошовою сумою залежно від перетворення. Єдиний метод `[symbol.toprimitive]` об’кту `user` обробляє всі випадки перетворення.


## toString/valueOf

Якщо немає `symbol.toprimitive` тоді JavaScript намагається знайти методи `tostring` і `valueof`:

- Для "String" підказка: `tostring`, і якщо це не існує, то `valueof` (таким чином `tostring` має пріоритет при перетворенні в рядок).
- For other hints: `valueOf`, and if it doesn't exist, then `toString` (so `valueOf` has the priority for maths).

Methods `toString` and `valueOf` come from ancient times. They are not symbols (symbols did not exist that long ago), but rather "regular" string-named methods. They provide an alternative "old-style" way to implement the conversion.

These methods must return a primitive value. If `toString` or `valueOf` returns an object, then it's ignored (same as if there were no method).

By default, a plain object has following `toString` and `valueOf` methods:

- The `toString` method returns a string `"[object Object]"`.
- The `valueOf` method returns the object itself.

Here's the demo:

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

So if we try to use an object as a string, like in an `alert` or so, then by default we see `[object Object]`.

The default `valueOf` is mentioned here only for the sake of completeness, to avoid any confusion. As you can see, it returns the object itself, and so is ignored. Don't ask me why, that's for historical reasons. So we can assume it doesn't exist.

Let's implement these methods to customize the conversion.

For instance, here `user` does the same as above using a combination of `toString` and `valueOf` instead of `Symbol.toPrimitive`:

```js run
let user = {
  name: "John",
  money: 1000,

  // for hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // for hint="number" or "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

As we can see, the behavior is the same as the previous example with `Symbol.toPrimitive`.

Often we want a single "catch-all" place to handle all primitive conversions. In this case, we can implement `toString` only, like this:

```js run
let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
```

In the absence of `Symbol.toPrimitive` and `valueOf`, `toString` will handle all primitive conversions.

### A conversion can return any primitive type

The important thing to know about all primitive-conversion methods is that they do not necessarily return the "hinted" primitive.

There is no control whether `toString` returns exactly a string, or whether `Symbol.toPrimitive` method returns a number for a hint `"number"`.

The only mandatory thing: these methods must return a primitive, not an object.

```smart header="Historical notes"
For historical reasons, if `toString` or `valueOf` returns an object, there's no error, but such value is ignored (like if the method didn't exist). That's because in ancient times there was no good "error" concept in JavaScript.

In contrast, `Symbol.toPrimitive` *must* return a primitive, otherwise there will be an error.
```

## Further conversions

As we know already, many operators and functions perform type conversions, e.g. multiplication `*` converts operands to numbers.

If we pass an object as an argument, then there are two stages:
1. The object is converted to a primitive (using the rules described above).
2. If the resulting primitive isn't of the right type, it's converted.

For instance:

```js run
let obj = {
  // toString handles all conversions in the absence of other methods
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number
```

1. The multiplication `obj * 2` first converts the object to primitive (that's a string `"2"`).
2. Then `"2" * 2` becomes `2 * 2` (the string is converted to number).

Binary plus will concatenate strings in the same situation, as it gladly accepts a string:

```js run
let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // 22 ("2" + 2), conversion to primitive returned a string => concatenation
```

## Summary

The object-to-primitive conversion is called automatically by many built-in functions and operators that expect a primitive as a value.

There are 3 types (hints) of it:
- `"string"` (for `alert` and other operations that need a string)
- `"number"` (for maths)
- `"default"` (few operators)

The specification describes explicitly which operator uses which hint. There are very few operators that "don't know what to expect" and use the `"default"` hint. Usually for built-in objects `"default"` hint is handled the same way as `"number"`, so in practice the last two are often merged together.

The conversion algorithm is:

1. Call `obj[Symbol.toPrimitive](hint)` if the method exists,
2. Otherwise if hint is `"string"`
    - try `obj.toString()` and `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try `obj.valueOf()` and `obj.toString()`, whatever exists.

In practice, it's often enough to implement only `obj.toString()` as a "catch-all" method for string conversions that should return a "human-readable" representation of an object, for logging or debugging purposes.  

As for math operations, JavaScript doesn't provide a way to "override" them using methods, so real life projects rarely use them on objects.