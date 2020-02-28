# Коментарі

Як нам відомо з розідлу <info:structure>, коментарі можна писати як на одному рядку: починаючи його з `//` так і на декількох рядках відокрлюючи їх за допомогою `/* ... */`.

Зазвичай ми використовуємо коментарі для опису опису того як і чому наш код працює.

На перший погляд, коментування може здаватись очевидним, проте початківці часто використовують їх неправильно.

## Погані кометарі

Початківці намагаються використовувати коментарі, щоб пояснити "що саме відбувається у коді". Наприклад:

```js
// Цей код зробить це (...) а потім ось це (...)
// ...і хто знає що ще...
дуже;
складний;
код;
```

Проте в якісному коді, кількість таких "пояснювальних" коментарів повинна бути мінімальною. Серйозно, код повинен бути зрозумілим без них.

Є хороше правило з приводу цього: "якщо код настільки не зрозумілий, що потребує коментарів, можливо його краще переписати".

### Рецепт: виносьте код у функції

Іноді має сенс замінити частину кода на функцію, наприклад:

```js
function showPrimes(n) {
  nextPrime:
  for (let i = 2; i < n; i++) {

*!*
    // перевірка чи є i простим числом
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
*/!*

    alert(i);
  }
}
```

Кращим варінтом було б помістити код в окрему функцію `isPrime`:


```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }

  return true;
}
```

Тепер ми можемо зрозуміти код легко. Сама функція замінила нам коментар. Такий код називається *самоописним*.

### Рецепт: створюйте функції

І якщо ми маємо такий довгий фрагмент кода:

```js
// тут ми додаємо віскі
for(let i = 0; i < 10; i++) {
  let drop = getWhiskey();
  smell(drop);
  add(drop, glass);
}

// тут ми додаємо сок
for(let t = 0; t < 3; t++) {
  let tomato = getTomato();
  examine(tomato);
  let juice = press(tomato);
  add(juice, glass);
}

// ...
```

Тоді кращим варінтом буде замінити його на окремі функції:

```js
addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
  for(let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    //...
  }
}

function addJuice(container) {
  for(let t = 0; t < 3; t++) {
    let tomato = getTomato();
    //...
  }
}
```

Знову ж таки, ім'я функцій самі описують, що в них відбувається. Немає потреби коментувати такий код. Також кращою є структура кода, коли він розподілений. Стає зрозумілим, що функція робить, що вона приймає і що повертає.

Насправді, ми не можемо уникнути повністю "пояснювальних" коментарів. Є складні алгоритми. Також існують деякі "прийоми" для оптимізації. Проте, як правило, ми повинні намагатись залишати код простим та самоописним.

## Хороші коментарі

Тож, пояснювальні коментарі зазвичай погані. Які ж тоді хороші?

Описуйте архітектуру
: Додавайте опис компонентів висого рівня, як вони взаємодіють, який потік управління мають у різних обставинах... Якщо коротко - огляд коду з висоту пташиного польоту. Є спеціальна мова [UML](https://uk.wikipedia.org/wiki/Unified_Modeling_Language) для побудови діаграм високорівневої архітектури кода. Її однозначно варто вчити.

Документуйте параметри функції та її використання
: Існує спеціальний синтаксис [JSDoc](https://uk.wikipedia.org/wiki/JSDoc) для документації функції: її використання, параметри, значення, що повертає.

Наприклад:
    
```js
/**
 * повертає x у n-й степені.
 *
 * @param {number} x число, що треба піднести до степеня.
 * @param {number} n Степінь, повинно бути натуральним числом.
 * @return {number} x пыднесене у n-у степінь.
 */
function pow(x, n) {
  ...
}
```

Такі коментарі дозволяють нам зрозуміти мету функції та використовувати її правильно без потреби зазирати у її код.

До речі, багато редакторів, наприклад [WebStorm](https://www.jetbrains.com/webstorm/) можуть їх розуміти та використовувати для автодоповнення і деякої автоматичної перевірки кода.

Також є інструменти, наприклад [JSDoc 3](https://github.com/jsdoc3/jsdoc), які можуть генерувати HTML-документацію з коментарів. Ви можете почитати більше про JSDoc тут: <http://usejsdoc.org/>.

Why is the task solved this way?
: What's written is important. But what's *not* written may be even more important to understand what's going on. Why is the task solved exactly this way? The code gives no answer.

If there are many ways to solve the task, why this one? Especially when it's not the most obvious one.

Without such comments the following situation is possible:
1. You (or your colleague) open the code written some time ago, and see that it's "suboptimal".
2. You think: "How stupid I was then, and how much smarter I'm now", and rewrite using the "more obvious and correct" variant.
3. ...The urge to rewrite was good. But in the process you see that the "more obvious" solution is actually lacking. You even dimly remember why, because you already tried it long ago. You revert to the correct variant, but the time was wasted.

    Comments that explain the solution are very important. They help to continue development the right way.

Any subtle features of the code? Where they are used?
: If the code has anything subtle and counter-intuitive, it's definitely worth commenting.

## Підсумки

An important sign of a good developer is comments: their presence and even their absence.

Good comments allow us to maintain the code well, come back to it after a delay and use it more effectively.

**Comment this:**

- Overall architecture, high-level view.
- Function usage.
- Important solutions, especially when not immediately obvious.

**Avoid comments:**

- That tell "how code works" and "what it does".
- Put them in only if it's impossible to make the code so simple and self-descriptive that it doesn't require them.

Comments are also used for auto-documenting tools like JSDoc3: they read them and generate HTML-docs (or docs in another format).
