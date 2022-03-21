# Нестандартні помилки, розширення Error

Коли ми щось розробляємо, нам часто потрібні власні класи помилок, щоб відображати конкретні речі, які можуть піти не так у наших програмах. Для помилок у мережевих операціях нам може знадобитися `HttpError`, для операцій з базою даних `DbError`, для пошуку операцій `NotFoundError` тощо.

Наші помилки повинні підтримувати основні властивості помилок, такі як `message`, `name` і, бажано, `stack`. Але вони також можуть мати інші властивості, наприклад, об’єкти `HttpError` можуть мати властивість `statusCode` зі значенням, як-от `404`, `403` або `500`.

JavaScript дозволяє використовувати `throw` з будь-яким аргументом, тому технічно наші спеціальні класи помилок не повинні успадковуватись від `Error`. Але якщо ми успадкуємо, то стає можливим використовувати `obj instanceof Error` для ідентифікації об’єктів помилки. Тому краще успадкувати від нього.

У міру розвитку програми наші власні помилки, природньо, утворюють ієрархію. Наприклад, `HttpTimeoutError` може успадковуватися від `HttpError` тощо.

## Розширення Error

Як приклад, давайте розглянемо функцію `readUser(json)`, яка повинна читати JSON з даними користувача.

Ось приклад того, як може виглядати валідний `json`:
```js
let json = `{ "name": "Іван", "age": 30 }`;
```

Всередині ми будемо використовувати `JSON.parse`. Якщо він отримує неправильний `json`, він викидає `SyntaxError`. Але навіть якщо `json` синтаксично правильний, це не означає, що це валідний користувач, чи не так? У ньому може не бути необхідних нам даних. Наприклад, він може не мати властивостей `name` та `age`, які є важливими для наших користувачів.

Наша функція `readUser(json)` не тільки читатиме JSON, але й перевірятеме ("валідуватиме") дані. Якщо немає обов’язкових полів або формат неправильний, це помилка. І це не `SyntaxError`, оскільки дані синтаксично правильні, а інший тип помилки. Ми назвемо його `ValidationError` і створимо для нього окремий клас. Подібна помилка також повинна містити інформацію про поле, що порушує правила.

Наш клас `ValidationError` має успадковуватись від класу `Error`.

Клас `Error` є вбудованим, але ось його приблизний код, щоб ми могли зрозуміти, що ми розширюємо:

```js
// "Псевдокод" для вбудованого класу Error, визначеного самим JavaScript
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (різні назви для різних вбудованих класів помилок)
    this.stack = <call stack>; // нестандартна властивість, але більшість середовищ її підтримує
  }
}
```

Тепер давайте успадкуємо від нього наш `ValidationError` і спробуємо його в дії:

```js run untrusted
*!*
class ValidationError extends Error {
*/!*
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

function test() {
  throw new ValidationError("Упс!");
}

try {
  test();
} catch(err) {
  alert(err.message); // Упс!
  alert(err.name); // ValidationError
  alert(err.stack); // список вкладених викликів з номерами рядків для кожного
}
```

Зверніть увагу: у рядку `(1)` ми викликаємо батьківський конструктор. JavaScript вимагає від нас викликати `super` у дочірньому конструкторі, це обов’язково. Батьківський конструктор встановлює властивість `message`.

Батьківський конструктор також встановлює для властивості `name` значення `"Error"`, тому в рядку `(2)` ми скидаємо його до потрібного значення.

Давайте спробуємо використати його в `readUser(json)`:

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// Usage
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError("No field: age");
  }
  if (!user.name) {
    throw new ValidationError("No field: name");
  }

  return user;
}

// Робочий приклад із try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Invalid data: " + err.message); // Invalid data: No field: name
*/!*
  } else if (err instanceof SyntaxError) { // (*)
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // невідома помилка, прокинемо її далі (**)
  }
}
```

Блок `try..catch` у коді вище обробляє як нашу `ValidationError`, так і вбудовану `SyntaxError` з `JSON.parse`.

Будь ласка, подивіться, як ми використовуємо `instanceof` для перевірки певного типу помилки в рядку `(*)`.

Ми також можемо використати `err.name`, ось так:

```js
// ...
// замість (err instanceof SyntaxError)
} else if (err.name == "SyntaxError") { // (*)
// ...
```

Версія з `instanceof` набагато краща, тому що в майбутньому ми можемо розширити `ValidationError`, щоб створювати його підтипи, наприклад, `PropertyRequiredError`. І перевірка `instanceof` буде також працювати для нових спадкових класів. Так що це рішення залишиться надійним і далі.

Також важливо, що якщо `catch` зустрічає невідому помилку, він повторно викидає її в рядок `(**)`. Наш блок `catch` знає лише, як обробляти помилки перевірки правильності даних та синтаксису, інші типи (спричинені помилкою в коді або іншими невідомими причинами) потрібно прокинути далі.

## Подальше наслідування

Клас `ValidationError` дуже загальний. Багато чого може піти не так. Властивість може бути відсутня або її значення має неправильний тип (наприклад, рядок у `age` замість числа). Давайте створимо більш конкретний клас `PropertyRequiredError`, саме для відсутніх властивостей. Він міститиме додаткову інформацію про властивість, якої немає.

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

*!*
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}
*/!*

// Usage
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}

// Робочий приклад із try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Invalid data: " + err.message); // Invalid data: No property: name
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
*/!*
  } else if (err instanceof SyntaxError) {
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // невідома помилка, прокинути далі
  }
}
```

Новий клас `PropertyRequiredError` простий у використанні: нам потрібно лише передати ім’я властивості: `new PropertyRequiredError(property)`. Повідомлення `message` у зрозумілому вигляді генерується його конструктором.

Зверніть увагу, що `this.name` у конструкторі `PropertyRequiredError` знову призначається вручну. Це може набриднути -- призначати `this.name = <ім’я класу>` у кожному спеціальному класі помилок. Ми можемо уникнути цього, створивши наш власний клас "базова помилка", який призначає `this.name = this.constructor.name`. А потім успадковувати всі наші власні помилки від нього.

Назвемо його `MyError`.

Ось спрощений код із `MyError` та іншими класами помилок:

```js run
class MyError extends Error {
  constructor(message) {
    super(message);
*!*
    this.name = this.constructor.name;
*/!*
  }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}

// правильна name
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
```

Тепер наші помилки набагато коротші, особливо `ValidationError`, оскільки ми позбулися рядка `"this.name = ..."` у конструкторі.

## Обгортання винятків

Метою функції `readUser` у коді вище є "читати дані користувача". У процесі можуть виникати різного роду помилки. Зараз ми маємо `SyntaxError` і `ValidationError`, але в майбутньому функції `readUser` може бути розширино і, ймовірно, вона генеруватиме інші види помилок.

Тому код, який викликає `readUser`, повинен обробляти ці помилки. Зараз він використовує кілька `if` у блоці `catch`, які перевіряють клас, обробляють відомі помилки та прокидують далі невідомі.

Схема така:

```js
try {
  ...
  readUser()  // потенційне джерело помилки
  ...
} catch (err) {
  if (err instanceof ValidationError) {
    // обробити помилки перевірки даних
  } else if (err instanceof SyntaxError) {
    // обробити синтаксичні помилки
  } else {
    throw err; // невідома помилка, прокинути далі
  }
}
```

У коді вище ми бачимо два типи помилок, але їх може бути більше.

Якщо функція `readUser` генерує кілька типів помилок, тоді ми повинні запитати себе: чи дійсно ми хочемо щоразу перевіряти всі типи помилок одну за одною?

Часто відповідь "ні": ми б хотіли бути "на один рівень вище всього цього". Ми просто хочемо знати, чи сталася "помилка читання даних" -- чому саме це сталося, часто не має значення (це описує повідомлення про помилку). Або, ще краще, ми хотіли б мати спосіб отримати деталі помилки, але лише за необхідності.

Техніка, яку ми тут описуємо, називається "обгортання винятків".

1. Ми створимо новий клас `ReadError`, щоб представляти загальну помилку "читання даних".
2. Функція `readUser` буде ловити помилки читання даних, які виникають всередині неї, наприклад, `ValidationError` і `SyntaxError`, і натомість генеруватиме `ReadError`.
3. Об’єкт `ReadError` зберігатиме посилання на вихідну помилку у своїй властивості `cause`.

Тоді код, який викликає `readUser`, повинен буде перевіряти лише `ReadError`, а не всі види помилок читання даних. І якщо йому потрібні додаткові відомості про помилку, він може перевірити її властивість `cause`.

Ось код, який визначає `ReadError` та демонструє його використання в `readUser` та `try..catch`:

```js run
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
*!*
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
*/!*
  }

  try {
    validateUser(user);
  } catch (err) {
*!*
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
*/!*
  }

}

try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
*!*
    alert(e);
    // Original error: SyntaxError: Unexpected token b in JSON at position 1
    alert("Original error: " + e.cause);
*/!*
  } else {
    throw e;
  }
}
```

У наведеному вище коді `readUser` працює, як описано -- ловить синтаксичні помилки та помилки перевірки даних та замість цього кидає помилки `ReadError` (невідомі помилки прокидуються далі, як і раніше).

Отже, зовнішній код перевіряє `instanceof ReadError` і все. Немає необхідності перевіряти всі можливі типи помилок.

Цей підхід називається "обгортання винятків", тому що ми беремо винятки "низького рівня" і "загортаємо" їх у `ReadError`, що є більш абстрактним. Такий підхід широко використовується в об’єктно-орієнтованому програмуванні.

## Підсумки

- Зазвичай класи своїх помилок ми можемо успадковувати від `Error` та інших вбудованих класів. Нам просто потрібно подбати про властивість `name` і не забути викликати `super`.
- Ми можемо використовувати `instanceof` для перевірки певних помилок. Це також працює зі спадковістю. Але іноді ми маємо об’єкт помилки, який надходить із бібліотеки від сторонніх розробників, і немає простого способу отримати його клас. Тоді для таких перевірок можна використовувати властивість `name`.
- Обгортання винятків є широко поширеною технікою: функція обробляє винятки низького рівня і створює помилки вищого рівня замість різноманітних низькорівневих. Винятки низького рівня іноді стають властивостями цього об’єкта, наприклад, `err.cause`, як у наведених вище прикладах, але це не є суворо обов’язковим.
