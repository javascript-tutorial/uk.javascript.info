
# Гетери і сетери властивостей

Є два види властивостей об’єкта.

Перший вид *властивості даних (data properties)*. Ми вже знаємо, як працювати з ними. Всі властивості, які ми використовували дотепер, були властивостями даних.

Другий вид властивостей -- це щось нове. Це *властивості аксесорів*(accessor property). Вони по суті функції, які виконуються при отриманні та встановленні значення, але виглядають як звичайні властивості в зовнішньому коді.

## Гетери та сетери

Властивості аксесорів представлені методами "гетер" та "сетер". У об’єкті вони буквально позначаються як `get` і `set`:

```js
let obj = {
  *!*get propName()*/!* {
    // гетер, код виконано під час отримання obj.propName
  },

  *!*set propName(value)*/!* {
    // сетер, код виконано під час встановлення obj.propName = value
  }
};
```

Гетер працює, коли `obj.propName` зчитується, сетер -- коли він призначається.

Наприклад, у нас є об’єкт `user` з `name` і `surname`:

```js
let user = {
  name: "Тарас",
  surname: "Мельник"
};
```

Тепер ми хочемо додати властивість `fullName`, яка повинна бути `"Тарас Мельник"`. Звичайно, ми не хочемо копіювати інформацію, що існує, тому ми можемо реалізувати її як аксесор:

```js run
let user = {
  name: "Тарас",
  surname: "Мельник",

*!*
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
*/!*
};

*!*
alert(user.fullName); // Тарас Мельник
*/!*
```

Ззовні аксесор виглядає як звичайна властивість. В цьому і є ідея аксесорів властивостей. Ми не *викликаємо* `user.fullname` як функцію, ми *читаємо* її як звичайну властивість: гетер виконає свою роботу за лаштунками.

Зараз `fullname` має тільки гетер. Якщо ми намагаємося присвоїти `user.fullName=`, буде помилка:

```js run
let user = {
  get fullName() {
    return `...`;
  }
};

*!*
user.fullName = "Test"; // Помилка (властивість має лише гетер)
*/!*
```

Виправимо це, додавши сетер для `user.fullName`:

```js run
let user = {
  name: "Тарас",
  surname: "Мельник",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

*!*
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
};

// виконується встановлення повного імені із заданим значенням.
user.fullName = "Аліса Бондар";

alert(user.name); // Аліса
alert(user.surname); // Бондар
```

Як результат, у нас є "віртуальна" властивість `fullName`. Вона читається і записується.

## Дескриптори аксесорів

Дескриптори для аксесорів властивостей відрізняються від дескрипторів для властивостей даних.

Для аксесорів властивостей немає `value` або `writable`, але замість цього є `get` і `set` функції.

Тобто, дескриптор аксесорів може мати:

- **`get`** -- функція без аргументів, що працює, коли читається властивість,
- **`set`** -- функція з одним аргументом, що викликається, коли встановлюється властивість,
- **`enumerable`** -- теж саме, що і для властивостей даних,
- **`configurable`** -- теж саме, що і для властивостей даних.

Наприклад, щоб створити аксесори `fullName` з `defineProperty`, ми можемо передати дескриптор з `get` і `set`:

```js run
let user = {
  name: "Іван",
  surname: "Іванов"
};

*!*
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
});

alert(user.fullName); // Іван Іванов

for(let key in user) alert(key); // name, surname
```

Будь ласка, зверніть увагу, що властивість може бути або аксесором (має `get/set` методи) або властивістю даних (має `value`), але не обома одночасно.

Якщо ми спробуємо передати як `get` так і `value` у тому ж дескрипторі, то буде помилка:

```js run
*!*
// Помилка: Неправильний дескриптор властивостей.
*/!*
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
```

## Розумні гетери/сетери

Гетери/сетери можуть бути використані як обгортки над "реальними" значеннями властивостей, щоб отримати більше контролю над операціями з ними.

Наприклад, якщо ми хочемо заборонити занадто короткі імена для `user`, ми можемо мати сетер `name` і зберігати значення в окремій властивості `_name`:

```js run
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("Ім’я занадто коротке, потрібно щонайменше 4 символи");
      return;
    }
    this._name = value;
  }
};

user.name = "Петро";
alert(user.name); // Петро

user.name = ""; // Ім’я занадто коротке...
```

Отже, ім’я зберігається у властивості `_name`, а доступ виконується за допомогою гетера та сетера.

Технічно зовнішній код може мати доступ до ім’я безпосередньо за допомогою `user._name`. Але існує широко відома домовленість, що властивості, які починаються з підкреслення `"_"`, є внутрішніми і не повинні використовуватись ззовні об’єкта.


## Використання для сумісності

Один із чудових прикладів використання аксесорів полягає у тому, що вони дозволяють контролювати "звичайну" властивість даних в будь-який момент, замінюючи її гетером і сетером, і налаштовуючи її поведінку.

Уявіть, що ми почали реалізовувати об’єкти користувача за допомогою властивостей даних `name` та `age`:

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let john = new User("Іван", 25);

alert( john.age ); // 25
```

...Але рано чи пізно, речі можуть змінюватися. Замість `age` ми можемо вирішити зберігати `birthday`, тому що це точніше і зручніше:

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john = new User("Іван", new Date(1992, 6, 1));
```

Тепер, що робити зі старим кодом, який все ще використовує властивість `age`?

Ми можемо спробувати знайти всі такі місця та виправити їх, але це вимагає часу, і це може бути важко зробити, якщо цей код використовується багатьма іншими людьми. І, крім того, `age` -- це гарна властивість для `user`, правильно?

Залишмо його.

Додавання гетера для `age` розв’язує проблему:

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  // вік розраховується з поточної дати та дня народження
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

let john = new User("Іван", new Date(1992, 6, 1));

alert( john.birthday ); // день народження доступний
alert( john.age );      // ...так само, як і вік
```

Тепер старий код теж працює, і у нас є гарна додаткова властивість.
