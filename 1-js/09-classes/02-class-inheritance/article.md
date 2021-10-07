
# Наслідування класу

Наслідування класу -- це спосіб для одного класу, щоб розширити інший клас.

Таким чином, ми можемо створити нову функціональність на основі існуючої.

## Ключове слово "extends"

Скажімо, у нас є клас `Animal`:

```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} біжить зі швидкістю ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} стоїть.`);
  }
}

let animal = new Animal("Моя тварина");
```

Ось як ми можемо представляти об'єкт `animal` і клас `Animal` графічно:

![](rabbit-animal-independent-animal.svg)

...І ми хотіли б створити інший `class Rabbit`.

Так як кролики є тваринами, клас `Rabbit` повинен базуватися на `Animal`, мати доступ до методів тварин, щоб кролики могли робити те, що можуть робити "загальні" тварини.

Синтаксис, щоб розширити інший клас: `class Child extends Parent`.

Давайте створимо `class Rabbit`, які успадковують від `Animal`:

```js
*!*
class Rabbit extends Animal {
*/!*
  hide() {
    alert(`${this.name} ховається!`);
  }
}

let rabbit = new Rabbit("Білий Кролик");

rabbit.run(5); // Білий Кролик біжить зі швидкістю 5.
rabbit.hide(); // Білий Кролик ховається!
```

Об'єкт класу `Rabbit` має доступ і до методів `Rabbit`, таких як `rabbit.hide()`, і до методів `Animal`.

Внутрішньо, ключове слово `extends` працює за допомогою хорошої старої механіки прототипу. Він встановлює в `Rabbit.prototype.[[Prototype]]` значення `Animal.prototype`. Отже, якщо метод не знайдено в `Rabbit.prototype`, JavaScript бере його з `Animal.prototype`.

![](animal-rabbit-extends.svg)

Наприклад, для пошуку методу `rabbit.run`, рушій перевіряє (знизу вгору на рисунку):
1. Об'єкт `rabbit` (не має `run`).
2. Його прототип, тобто `Rabbit.prototype` (має `hide`, але не має `run`).
3. Його прототип, тобто (завдяки `extends`) `Animal.prototype`, що, нарешті, має метод `run`.

Як ми можемо згадати з розділу <info:native-prototypes>, сам JavaScript використовує прототипне наслідування для вбудованих об'єктів. Наприклад, `Date.prototype.[[Prototype]]` -- це `Object.prototype`. Ось чому дати мають доступ до загальних методів об'єкта.

````smart header="Будь-який вираз допускається після `extends`"
Синтаксис класу дозволяє вказати не лише клас, але будь-який вираз після `extends`.

Наприклад, виклик функції, який генерує батьківський клас:

```js run
function f(phrase) {
  return class {
    sayHi() { alert(phrase); }
  };
}

*!*
class User extends f("Привіт") {}
*/!*

new User().sayHi(); // Привіт
```
Тут `class User` успадковує від результату `f("Привіт")`.

Це може бути корисним для просунутих паттернів програмування, коли ми використовуємо функції для створення класів залежно від багатьох умов і можемо успадкуватися від них.
````

## Перевизначення методу

Тепер давайте рухатися вперед і перевизначимо метод. За замовчуванням всі методи, які не вказані в `class Rabbit`, беруться безпосередньо "як є" від `class Animal`.

Але якщо ми вкажемо наш власний метод в `Rabbit`, наприклад, `stop()`, то він буде використовуватися замість методу з `class Animal`:

```js
class Rabbit extends Animal {
  stop() {
    // ...тепер це буде використано для rabbit.stop()
    // замість stop() з класу Animal
  }
}
```

Зазвичай ми не хочемо повністю замінити батьківський метод, але, скоріше, побудувати метод на його основі, щоб налаштувати або розширити функціональність. Ми робимо щось у нашому методі, але викликаемо батьківський метод до/після нього або в процесі.

Класи забезпечують ключове слово `"super"` для цього.

- `super.method(...)`, щоб викликати батьківський метод.
- `super(...)`, щоб викликати батьківський конструктор (лише в нашому конструкторі).

Наприклад, нехай наш кролик автоматично ховається, коли зупиняється:

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed = speed;
    alert(`${this.name} біжить зі швидкістю ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
    alert(`${this.name} стоїть.`);
  }

}

class Rabbit extends Animal {
  hide() {
    alert(`${this.name} ховається!`);
  }

*!*
  stop() {
    super.stop(); // викликає батьківський stop
    this.hide(); // а потім ховається
  }
*/!*
}

let rabbit = new Rabbit("Білий Кролик");

rabbit.run(5); // Білий Кролик біжить зі швидкістю 5.
rabbit.stop(); // Білий Кролик стоїть. Білий Кролик ховається!
```

Тепер "Кролик" має метод "Стоп", який називає батька "Super.Stop" () "у процесі.

````smart header="Стрілочні функції не мають `super`"
Як зазначалося в розділі <info:arrow-functions>, стрілочні функції не мають `super`.

Якщо `super` доступний, то він береться із зовнішньої функції. Наприклад:
```js
class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000); // викликає батьківський stop після 1 сек
  }
}
```

`super` у стрілочної функції такий же, як у `stop()`, тому він працює як передбачається. Якщо ми вказали "звичайну" функцію тут, то буде помилка:

```js
// Unexpected super
setTimeout(function() { super.stop() }, 1000);
```
````


## Перевизначення конструктора

З конструкторами трохи складніше.

До цих пір `Rabbit` не мав власного конструктора.

Згідно із [специфікацією](https:///tc39.github.io/ecma262/#secuntime-semantics-classdefinutionevaluation), якщо клас розширює ще один клас і не має конструктора, то автоматично створюється "порожній" конструктор:

```js
class Rabbit extends Animal {
  // генерується для класів-нащадків без власних конструкторів
*!*
  constructor(...args) {
    super(...args);
  }
*/!*
}
```

Як ми бачимо, він в основному викликає батьківський конструктор та передає йому всі аргументи. Це відбувається, якщо ми не напишемо для нашого класу свій власний конструктор.

Тепер додамо індивідуальний конструктор до `Rabbit`. Він буде визначати `earLength` на додачу до `name`:

```js run
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  // ...
}

class Rabbit extends Animal {

*!*
  constructor(name, earLength) {
    this.speed = 0;
    this.name = name;
    this.earLength = earLength;
  }
*/!*

  // ...
}

*!*
// Не працює!
let rabbit = new Rabbit("Білий Кролик", 10); // Error: this is not defined.
*/!*
```

Упс! У нас є помилка. Тепер ми не можемо створювати кроликів. Що пішло не так?

Коротка відповідь:

- **Конструктори в класі, що наслідується, повинні викликати `super(...)` і (!) зробити це перед використанням `this`.**

...Але чому? Що тут відбувається? Дійсно, ця вимога здається дивною.

Звичайно, є пояснення. Давайте поглибимося в деталі, щоб ви дійсно зрозуміли, що відбувається.

У JavaScript існує відмінність між функцією-конструктором успадковуючого класу (так званого "похідного конструктора") та іншими функціями. Похідний конструктор має особливу внутрішню власність `[[ConstructorKind]]:"derived"`. Це особлива внутрішня позначка.

Ця позначка впливає на поведінку функції-конструктора з `new`.

- Коли звичайна функція виконується з ключовим словом `new`, воно створює порожній об'єкт і присвоює його `this`.
- Але коли працює похідний конструктор, він не робить цього. Він очікує, що батьківський конструктор виконує цю роботу.

Таким чином, похідний конструктор повинен викликати `super`, щоб виконати його батьківський (базовий) конструктор, інакше об'єкт для `this` не буде створено. І ми отримаємо помилку.

Для роботи конструктора `Rabbit` він повинен викликати `super()` перед використанням `this`, як тут:

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  // ...
}

class Rabbit extends Animal {

  constructor(name, earLength) {
*!*
    super(name);
*/!*
    this.earLength = earLength;
  }

  // ...
}

*!*
// тепер добре
let rabbit = new Rabbit("Білий Кролик", 10);
alert(rabbit.name); // Білий Кролик
alert(rabbit.earLength); // 10
*/!*
```



### Перевизначення поля класу: складна примітка

```warn header="Просунута примітка"
Ця примітка передбачає, що у вас є певний досвід роботи з класами, можливо, на інших мовах програмування.

Це забезпечує краще розуміння мови, а також пояснює поведінку, яка може бути джерелом помилок (але не дуже часто).

Якщо вам важко зрозуміти цю секцію, просто продовжуйте читати далі, а потім можете повернутися до неї через деякий час.
```

Ми можемо перевизначити не тільки методи, а й поля класу.

Хоча, що існує складна поведінка, коли ми отримуємо доступ до перевизначеного поля в батьківському конструкторі, яка сильно відрізняється від більшості інших мов програмування.

Розглянемо цей приклад:

```js run
class Animal {
  name = 'тварина';

  constructor() {
    alert(this.name); // (*)
  }
}

class Rabbit extends Animal {
  name = 'кролик';
}

new Animal(); // тварина
*!*
new Rabbit(); // тварина
*/!*
```

Тут клас `Rabbit` наслідує клас `Animal` і перевизначає поле `name` власним значенням.

Немає власного конструктора в `Rabbit`, тому викликається конструктор `Animal`.

Цікаво, що в обох випадках: `new Animal()` і `new Rabbit()`, `alert` в рядку `(*)` показує `animal`.

**Іншими словами, батьківський конструктор завжди використовує власне значення поля, а не перевизначене.**

Що в цьому дивного?

Якщо це ще не зрозуміло, будь ласка, порівняйте з методами.

Ось той самий код, але замість поля `this.name` ми викликаємо метод `this.showName()`.

```js run
class Animal {
  showName() {  // замість this.name = 'тварина'
    alert('тварина');
  }

  constructor() {
    this.showName(); // замість alert(this.name);
  }
}

class Rabbit extends Animal {
  showName() {
    alert('кролик');
  }
}

new Animal(); // тварина
*!*
new Rabbit(); // кролик
*/!*
```

Будь ласка, зверніть увагу: тепер вивід відрізняється.

І це те, що ми, дійсно, очікуємо. Коли батьківський конструктор викликається в похідному класі, він використовує перевизначений метод.

...Але для полів класу це не так. Як сказано, батьківський конструктор завжди використовує батьківське поле.

Чому існує різниця?

Ну, причина полягає у порядку ініціалізації поля. Поле класу ініціалізується:
- До конструктора для базового класу (котрий нічого не наслідує),
- Відразу після `super()` для похідного класу.

У нашому випадку `Rabbit` -- це похідний клас. У ньому немає конструктора. Як сказано раніше, це те ж саме, якби там був порожній конструктор лише з `super(...args)`.

Отже, `new Rabbit()` викликає `super()`, таким чином, виконуючи батьківський конструктор, і (за правилом для похідних класів) лише після того ініціалізує свої поля класу. На момент виконання батьківського конструктора, ще немає полів класу `Rabbit`, тому використовуються класу `Animal`.

Ця тонка різниця між полями та методами є специфічною для JavaScript

На щастя, ця поведінка виявляє себе лише якщо у перевизначене поле використовується у батьківському конструкторі. Тоді важко зрозуміти, що відбувається, тому ми пояснюємо це тут.

Якщо це стає проблемою, її можна вирішити за допомогою методів або геттерів/сеттерів, а не полів.


## Super: internals, [[HomeObject]]

```warn header="Advanced information"
If you're reading the tutorial for the first time - this section may be skipped.

It's about the internal mechanisms behind inheritance and `super`.
```

Let's get a little deeper under the hood of `super`. We'll see some interesting things along the way.

First to say, from all that we've learned till now, it's impossible for `super` to work at all!

Yeah, indeed, let's ask ourselves, how it should technically work? When an object method runs, it gets the current object as `this`. If we call `super.method()` then, the engine needs to get the `method` from the prototype of the current object. But how?

The task may seem simple, but it isn't. The engine knows the current object `this`, so it could get the parent `method` as `this.__proto__.method`. Unfortunately, such a "naive" solution won't work.

Let's demonstrate the problem. Without classes, using plain objects for the sake of simplicity.

You may skip this part and go below to the `[[HomeObject]]` subsection if you don't want to know the details. That won't harm. Or read on if you're interested in understanding things in-depth.

In the example below, `rabbit.__proto__ = animal`. Now let's try: in `rabbit.eat()` we'll call `animal.eat()`, using `this.__proto__`:

```js run
let animal = {
  name: "Animal",
  eat() {
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {
*!*
    // that's how super.eat() could presumably work
    this.__proto__.eat.call(this); // (*)
*/!*
  }
};

rabbit.eat(); // Rabbit eats.
```

At the line `(*)` we take `eat` from the prototype (`animal`) and call it in the context of the current object. Please note that `.call(this)` is important here, because a simple `this.__proto__.eat()` would execute parent `eat` in the context of the prototype, not the current object.

And in the code above it actually works as intended: we have the correct `alert`.

Now let's add one more object to the chain. We'll see how things break:

```js run
let animal = {
  name: "Animal",
  eat() {
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  eat() {
    // ...bounce around rabbit-style and call parent (animal) method
    this.__proto__.eat.call(this); // (*)
  }
};

let longEar = {
  __proto__: rabbit,
  eat() {
    // ...do something with long ears and call parent (rabbit) method
    this.__proto__.eat.call(this); // (**)
  }
};

*!*
longEar.eat(); // Error: Maximum call stack size exceeded
*/!*
```

The code doesn't work anymore! We can see the error trying to call `longEar.eat()`.

It may be not that obvious, but if we trace `longEar.eat()` call, then we can see why. In both lines `(*)` and `(**)` the value of `this` is the current object (`longEar`). That's essential: all object methods get the current object as `this`, not a prototype or something.

So, in both lines `(*)` and `(**)` the value of `this.__proto__` is exactly the same: `rabbit`. They both call `rabbit.eat` without going up the chain in the endless loop.

Here's the picture of what happens:

![](this-super-loop.svg)

1. Inside `longEar.eat()`, the line `(**)` calls `rabbit.eat` providing it with `this=longEar`.
    ```js
    // inside longEar.eat() we have this = longEar
    this.__proto__.eat.call(this) // (**)
    // becomes
    longEar.__proto__.eat.call(this)
    // that is
    rabbit.eat.call(this);
    ```
2. Then in the line `(*)` of `rabbit.eat`, we'd like to pass the call even higher in the chain, but `this=longEar`, so `this.__proto__.eat` is again `rabbit.eat`!

    ```js
    // inside rabbit.eat() we also have this = longEar
    this.__proto__.eat.call(this) // (*)
    // becomes
    longEar.__proto__.eat.call(this)
    // or (again)
    rabbit.eat.call(this);
    ```

3. ...So `rabbit.eat` calls itself in the endless loop, because it can't ascend any further.

The problem can't be solved by using `this` alone.

### `[[HomeObject]]`

To provide the solution, JavaScript adds one more special internal property for functions: `[[HomeObject]]`.

When a function is specified as a class or object method, its `[[HomeObject]]` property becomes that object.

Then `super` uses it to resolve the parent prototype and its methods.

Let's see how it works, first with plain objects:

```js run
let animal = {
  name: "Animal",
  eat() {         // animal.eat.[[HomeObject]] == animal
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {         // rabbit.eat.[[HomeObject]] == rabbit
    super.eat();
  }
};

let longEar = {
  __proto__: rabbit,
  name: "Long Ear",
  eat() {         // longEar.eat.[[HomeObject]] == longEar
    super.eat();
  }
};

*!*
// works correctly
longEar.eat();  // Long Ear eats.
*/!*
```

It works as intended, due to `[[HomeObject]]` mechanics. A method, such as `longEar.eat`, knows its `[[HomeObject]]` and takes the parent method from its prototype. Without any use of `this`.

### Methods are not "free"

As we've known before, generally functions are "free", not bound to objects in JavaScript. So they can be copied between objects and called with another `this`.

The very existence of `[[HomeObject]]` violates that principle, because methods remember their objects. `[[HomeObject]]` can't be changed, so this bond is forever.

The only place in the language where `[[HomeObject]]` is used -- is `super`. So, if a method does not use `super`, then we can still consider it free and copy between objects. But with `super` things may go wrong.

Here's the demo of a wrong `super` result after copying:

```js run
let animal = {
  sayHi() {
    alert(`I'm an animal`);
  }
};

// rabbit inherits from animal
let rabbit = {
  __proto__: animal,
  sayHi() {
    super.sayHi();
  }
};

let plant = {
  sayHi() {
    alert("I'm a plant");
  }
};

// tree inherits from plant
let tree = {
  __proto__: plant,
*!*
  sayHi: rabbit.sayHi // (*)
*/!*
};

*!*
tree.sayHi();  // I'm an animal (?!?)
*/!*
```

A call to `tree.sayHi()` shows "I'm an animal". Definitely wrong.

The reason is simple:
- In the line `(*)`, the method `tree.sayHi` was copied from `rabbit`. Maybe we just wanted to avoid code duplication?
- Its `[[HomeObject]]` is `rabbit`, as it was created in `rabbit`. There's no way to change `[[HomeObject]]`.
- The code of `tree.sayHi()` has `super.sayHi()` inside. It goes up from `rabbit` and takes the method from `animal`.

Here's the diagram of what happens:

![](super-homeobject-wrong.svg)

### Methods, not function properties

`[[HomeObject]]` is defined for methods both in classes and in plain objects. But for objects, methods must be specified exactly as `method()`, not as `"method: function()"`.

The difference may be non-essential for us, but it's important for JavaScript.

In the example below a non-method syntax is used for comparison. `[[HomeObject]]` property is not set and the inheritance doesn't work:

```js run
let animal = {
  eat: function() { // intentionally writing like this instead of eat() {...
    // ...
  }
};

let rabbit = {
  __proto__: animal,
  eat: function() {
    super.eat();
  }
};

*!*
rabbit.eat();  // Error calling super (because there's no [[HomeObject]])
*/!*
```

## Summary

1. To extend a class: `class Child extends Parent`:
    - That means `Child.prototype.__proto__` will be `Parent.prototype`, so methods are inherited.
2. When overriding a constructor:
    - We must call parent constructor as `super()` in `Child` constructor before using `this`.
3. When overriding another method:
    - We can use `super.method()` in a `Child` method to call `Parent` method.
4. Internals:
    - Methods remember their class/object in the internal `[[HomeObject]]` property. That's how `super` resolves parent methods.
    - So it's not safe to copy a method with `super` from one object to another.

Also:
- Arrow functions don't have their own `this` or `super`, so they transparently fit into the surrounding context.
