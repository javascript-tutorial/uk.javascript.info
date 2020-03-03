# Автоматичне тестування за допомогою Mocha

Автоматичне тестування буде використовуватися у настпуних завданнях, і воно широко використовується у реальних проектах.

## Навіщо нам потрібні тести?

Коли ми пишемо функцію, ми можемо уявити, як її будуть використовувати - які параметри дають який результат.

Під час розробки ми можемо перевірити функцію, виконуючи її та перевіряючи фактичний результат з очікуваним. Наприклад, ми можемо робити це у консолі.

Якщо результат не вірний -- ми можемо підправити код, виконати її знову, перевірити результат знову, і так до тих пір, поки вона не працюватиме вірно.

Але такі ручні "повторні виконання" недосконалі.

**Тестуючи код вручну, можна легко щось упустити.**

Наприклад, ми створили функцію `f`. Перевірили деякий код, тестуємо: `f(1)` працює, але `f(2)` не працює. Ми підправляємо код і тепер `f(2)` працює. Здається, що справу зроблено? Але ми забули перевірити чи `f(1)` досі працює. Це може призвести до помилки.

Це дуже типово. Коли ми щось розробляємо, ми пам’ятаємо про багато можливих випадків використання. Але не треба очікувати, що програміст перевірятиме їх усі вручну після кожної зміни. Так стає легко виправити одне і зламати інше.

**Автоматизоване тестування означає, що тести пишуться окремо від основного коду, доповнюючи його. Вони виконують наші функції різними способами і порівнюють результати з очікуваними.**

## Керована поведінкою розробка (BDD)

Давайте розпочнемо з техніки під назвою [Керована поведінкою розробка](https://uk.wikipedia.org/wiki/%D0%9A%D0%B5%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B0_%D0%BF%D0%BE%D0%B2%D0%B5%D0%B4%D1%96%D0%BD%D0%BA%D0%BE%D1%8E_%D1%80%D0%BE%D0%B7%D1%80%D0%BE%D0%B1%D0%BA%D0%B0) або коротко, BDD (від англ. behavior-driven development).

**BDD це три в одному: і тести, і документація, і приклади використання.**

Щоб зрозуміти BDD, ми розглянемо реальний приклад розробки.

## Розробка функції піднесення до степеня - "pow": специфікація

Припустимо, ми хочемо зробити функцію `pow(x, n)`, яка піднесе `x` до степеня `n`.
Let's say we want to make a function `pow(x, n)` that raises `x` to an integer power `n` (`n` - ціле число). Ми припускаємо, що `n≥0`.

Це завдання є просто прикладом - в JavaScript є оператор `**`, що зводить до степеня, але в цьому прикладі ми зосередимось на процесі розробки, який потім можна також застосовувати і для більш складних завдань.

Перш ніж створити код для функції `pow ', ми можемо уявити, що вона повинна виконувати, і описати її.

Такий опис називається *специфікацією*, і він описує приклади використання функції разом з тестами, наприклад:

```js
describe("pow", function() {

  it("підносить до n-нного степеня", function() {
    assert.equal(pow(2, 3), 8);
  });

});
```

Як ви помітили, специфікація має три основні блоки:

`describe("title", function() { ... })`
: Яку функціональність ми описуємо. В нашому випадку, ми описуємо функцію `pow`. Використовується для групування блоків `it`, які "виконують роботу".

`it("підносить до n-нного степеня", function() { ... })`
: У першому аргументі (назві) `it` ми *людською мовою* описуємо конкретний спосіб використання функції, а другому аргументі пишемо функцію, яка тестуватиме цей спосіб.

`assert.equal(value1, value2)`
: Код, всереді блоку `it`, якщо реалізація правильна, повинен виконуватись без помилок.

    Функції `assert.*` використовуються для перевірки того, що функція `pow` працює, як ми очікуємо. В нашому випадку, ми використовуємо одну з них -- `assert.equal`, вона порівнює аргументи і сповіщає про помилку, якщо вони відрізняються. Тут вона перевіряє, що результат `pow(2, 3)` дорівнює `8`. Є також інші способи порівняння та перевірки, які ми розглянемо пізніше.

Специфікацію можна виконати, і вона у свою чергу виконає тести вказані у блоках `it`. Ми розглянемо це далі.

## Процес розробки

Зазвичай, процес розробки має настпуний вигляд:

1. Пишуть первинну специфікацію з тестами основного функціонала.
2. Створюється початкова реалізація.
3. Щоб перевірити, чи вона працює, ми використовуємо тестовий фреймворк [Mocha](http://mochajs.org/) (більш детально нижче), який виконує специфікацію. Якщо функціонал не завершено - виводяться повідомлення про помилки. Ми робимо виправлення до тих пір, поки не матимемо повністю робочий код.
4. Тепер ми маємо початкову реалізацію з тестами.
5. Ми додаємо більше способів використання до специфікації, навіть таких, що поки що не підтримуються реалізацією. Виконання тестів знову завершиться невдачою.
6. Переходимо на 3-й пункт, змінюємо реалізацію, щоб вона відповідала тестам і вони не повертали повідомлення про помилку.
7. Повторюємо процес, описаний у пунктах з 3-го по 6-ий, поки функціонал не буде повністю готовий.

Тобто, процес розробки є *ітеративним*. Ми пишемо специфікацію, реалізуємо її, переконуємось, що тести проходять, потім пишемо ще тести, переконуємось, що вони також проходять і т.д. Завершивши цей процес, ми маємо реалізований робочий функціонал і тести до нього.

Давайте розглянемо цей процес розробки на нашому прикладі.

Перший пункт вже виконано - ми маємо первинну специфікацію для функції `pow`. Теперр, перед початком реалізації, давайте використаємо декілька бібліотек JavaScript для виконання тестів, щоб перевірити, що вони працюютть (вони всі завершаться невдачою).

## Специфікація в дії

Тут у посібнику ми будемо використовувати такі бібліотеки JavaScript для тестів:

- [Mocha](http://mochajs.org/) -- базовий фреймворк: він забезпечує нас загальними функціями для тестування, в тому числі `describe` та `it`, а також головною функцією, що виконує тести.
- [Chai](http://chaijs.com) -- бібліотека з багатьма припущеннями. Вона дозволяє використовувати безліч різних припущень, але поки що на потрібне лише припущення `assert.equal`.
- [Sinon](http://sinonjs.org/) -- a library to spy over functions, emulate built-in functions and more, we'll need it much later.

These libraries are suitable for both in-browser and server-side testing. Here we'll consider the browser variant.

The full HTML page with these frameworks and `pow` spec:

```html src="index.html"
```

The page can be divided into five parts:

1. The `<head>` -- add third-party libraries and styles for tests.
2. The `<script>` with the function to test, in our case -- with the code for `pow`.
3. The tests -- in our case an external script `test.js` that has `describe("pow", ...)` from above.
4. The HTML element `<div id="mocha">` will be used by Mocha to output results.
5. The tests are started by the command `mocha.run()`.

The result:

[iframe height=250 src="pow-1" border=1 edit]

As of now, the test fails, there's an error. That's logical: we have an empty function code in `pow`, so `pow(2,3)` returns `undefined` instead of `8`.

For the future, let's note that there are more high-level test-runners, like [karma](https://karma-runner.github.io/) and others, that make it easy to autorun many different tests.

## Initial implementation

Let's make a simple implementation of `pow`, for tests to pass:

```js
function pow(x, n) {
  return 8; // :) we cheat!
}
```

Wow, now it works!

[iframe height=250 src="pow-min" border=1 edit]

## Improving the spec

What we've done is definitely a cheat. The function does not work: an attempt to calculate `pow(3,4)` would give an incorrect result, but tests pass.

...But the situation is quite typical, it happens in practice. Tests pass, but the function works wrong. Our spec is imperfect. We need to add more use cases to it.

Let's add one more test to check that `pow(3, 4) = 81`.

We can select one of two ways to organize the test here:

1. The first variant -- add one more `assert` into the same `it`:

    ```js
    describe("pow", function() {

      it("raises to n-th power", function() {
        assert.equal(pow(2, 3), 8);
    *!*
        assert.equal(pow(3, 4), 81);
    */!*
      });

    });
    ```
2. The second -- make two tests:

    ```js
    describe("pow", function() {

      it("2 raised to power 3 is 8", function() {
        assert.equal(pow(2, 3), 8);
      });

      it("3 raised to power 4 is 81", function() {
        assert.equal(pow(3, 4), 81);
      });

    });
    ```

The principal difference is that when `assert` triggers an error, the `it` block immediately terminates. So, in the first variant if the first `assert` fails, then we'll never see the result of the second `assert`.

Making tests separate is useful to get more information about what's going on, so the second variant is better.

And besides that, there's one more rule that's good to follow.

**One test checks one thing.**

If we look at the test and see two independent checks in it, it's better to split it into two simpler ones.

So let's continue with the second variant.

The result:

[iframe height=250 src="pow-2" edit border="1"]

As we could expect, the second test failed. Sure, our function always returns `8`, while the `assert` expects `81`.

## Improving the implementation

Let's write something more real for tests to pass:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

To be sure that the function works well, let's test it for more values. Instead of writing `it` blocks manually, we can generate them in `for`:

```js
describe("pow", function() {

  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} in the power 3 is ${expected}`, function() {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }

});
```

The result:

[iframe height=250 src="pow-3" edit border="1"]

## Nested describe

We're going to add even more tests. But before that let's note that the helper function `makeTest` and `for` should be grouped together. We won't need `makeTest` in other tests, it's needed only in `for`: their common task is to check how `pow` raises into the given power.

Grouping is done with a nested `describe`:

```js
describe("pow", function() {

*!*
  describe("raises x to power 3", function() {
*/!*

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} in the power 3 is ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

*!*
  });
*/!*

  // ... more tests to follow here, both describe and it can be added
});
```

The nested `describe` defines a new "subgroup" of tests. In the output we can see the titled indentation:

[iframe height=250 src="pow-4" edit border="1"]

In the future we can add more `it` and `describe` on the top level with helper functions of their own, they won't see `makeTest`.

````smart header="`before/after` and `beforeEach/afterEach`"
We can setup `before/after` functions that execute before/after running tests, and also `beforeEach/afterEach` functions that execute before/after *every* `it`.

For instance:

```js no-beautify
describe("test", function() {

  before(() => alert("Тестування розпочато – до всіх тестів"));
  after(() => alert("Тестування завершено – після всіх тестів"));

  beforeEach(() => alert("До тесту – початок тесту"));
  afterEach(() => alert("Після тесту – вихід з тесту"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
```

The running sequence will be:

```
Testing started – before all tests (before)
Before a test – enter a test (beforeEach)
1
After a test – exit a test   (afterEach)
Before a test – enter a test (beforeEach)
2
After a test – exit a test   (afterEach)
Testing finished – after all tests (after)
```

[edit src="beforeafter" title="Open the example in the sandbox."]

Usually, `beforeEach/afterEach` and `before/after` are used to perform initialization, zero out counters or do something else between the tests (or test groups).
````

## Extending the spec

The basic functionality of `pow` is complete. The first iteration of the development is done. When we're done celebrating and drinking champagne -- let's go on and improve it.

As it was said, the function `pow(x, n)` is meant to work with positive integer values `n`.

To indicate a mathematical error, JavaScript functions usually return `NaN`. Let's do the same for invalid values of `n`.

Let's first add the behavior to the spec(!):

```js
describe("pow", function() {

  // ...

  it("for negative n the result is NaN", function() {
*!*
    assert.isNaN(pow(2, -1));
*/!*
  });

  it("for non-integer n the result is NaN", function() {
*!*
    assert.isNaN(pow(2, 1.5));    
*/!*
  });

});
```

The result with new tests:

[iframe height=530 src="pow-nan" edit border="1"]

The newly added tests fail, because our implementation does not support them. That's how BDD is done: first we write failing tests, and then make an implementation for them.

```smart header="Other assertions"
Please note the assertion `assert.isNaN`: it checks for `NaN`.

There are other assertions in [Chai](http://chaijs.com) as well, for instance:

- `assert.equal(value1, value2)` -- checks the equality  `value1 == value2`.
- `assert.strictEqual(value1, value2)` -- checks the strict equality `value1 === value2`.
- `assert.notEqual`, `assert.notStrictEqual` -- inverse checks to the ones above.
- `assert.isTrue(value)` -- checks that `value === true`
- `assert.isFalse(value)` -- checks that `value === false`
- ...the full list is in the [docs](http://chaijs.com/api/assert/)
```

So we should add a couple of lines to `pow`:

```js
function pow(x, n) {
*!*
  if (n < 0) return NaN;
  if (Math.round(n) != n) return NaN;
*/!*

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Now it works, all tests pass:

[iframe height=300 src="pow-full" edit border="1"]

[edit src="pow-full" title="Open the full final example in the sandbox."]

## Summary

In BDD, the spec goes first, followed by implementation. At the end we have both the spec and the code.

The spec can be used in three ways:

1. As **Tests** - they guarantee that the code works correctly.
2. As **Docs** -- the titles of `describe` and `it` tell what the function does.
3. As **Examples** -- the tests are actually working examples showing how a function can be used.

With the spec, we can safely improve, change, even rewrite the function from scratch and make sure it still works right.

That's especially important in large projects when a function is used in many places. When we change such a function, there's just no way to manually check if every place that uses it still works right.

Without tests, people have two ways:

1. To perform the change, no matter what. And then our users meet bugs, as we probably fail to check something manually.
2. Or, if the punishment for errors is harsh, as there are no tests, people become afraid to modify such functions, and then the code becomes outdated, no one wants to get into it. Not good for development.

**Automatic testing helps to avoid these problems!**

If the project is covered with tests, there's just no such problem. After any changes, we can run tests and see a lot of checks made in a matter of seconds.

**Besides, a well-tested code has better architecture.**

Naturally, that's because auto-tested code is easier to modify and improve. But there's also another reason.

To write tests, the code should be organized in such a way that every function has a clearly described task, well-defined input and output. That means a good architecture from the beginning.

In real life that's sometimes not that easy. Sometimes it's difficult to write a spec before the actual code, because it's not yet clear how it should behave. But in general writing tests makes development faster and more stable.

Later in the tutorial you will meet many tasks with tests baked-in. So you'll see more practical examples.

Writing tests requires good JavaScript knowledge. But we're just starting to learn it. So, to settle down everything, as of now you're not required to write tests, but you should already be able to read them even if they are a little bit more complex than in this chapter.
