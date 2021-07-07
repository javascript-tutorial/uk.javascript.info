# Копіювання об’єктів та посилання

Однією з принципових відмінностей об’єктів від примітивів є те, що об’єкти зберігаються та копіюються "за посиланням", тоді як примітивні значення: рядки, числа, логічні значення тощо - завжди копіюються "за значенням".

Це легко зрозуміти, якщо заглянути під капот того, що відбувається, коли ми копіюємо значення.

Почнемо з примітиву, наприклад, рядка.

Запишемо копію `message` у `phrase`:

```js
let message = "Привіт!";
let phrase = message;
```

В результаті ми маємо дві незалежні змінні, кожна з яких зберігає рядок `"Привіт!"`.

![](variable-copy-value.svg)

Цілком очікуванний результат, згодні?

Об'єкти поводяться інакше.

**Змінна зберігає не сам об'єкт, а його "адресу в пам’яті" -- іншими словами "посилання" на нього.**

Проілюструємо це:

```js
let user = {
  name: "Іван"
};
```

І ось як це насправді зберігається в пам’яті:

![](variable-contains-reference.svg)

Об’єкт зберігається десь у пам’яті (справа на зображенні), тоді як у змінній `user` (зліва) є "посилання" на нього.

Ми можемо думати про змінну `user`, як про шухляду з аркушем паперу з адресою об’єкта на ньому.

Коли ми виконуємо дії з об’єктом, напр. зчитуємо властивість `user.name`, рушій JavaScript перевіряє, що знаходиться за цією адресою, і виконує операцію над фактичним об'єктом.

Ось чому це важливо:

**Коли копіюється змінна об’єкта, копіюється посилання, але сам об’єкт не дублюється.**

Наприклад:

```js no-beautify
let user = { name: "Іван" };

let admin = user; // копіювання за посиланням
```

Тепер у нас є дві змінні, кожна з яких зберігає посилання на єдиний об’єкт:

![](variable-copy-reference.svg)

Як бачите, є тільки один об’єкт, але тепер із двома змінними, які посилаються на нього.

Ми можемо використати будь-яку змінну для доступу до об’єкта та модифікації його вмісту:

```js run
let user = { name: 'Іван' };

let admin = user;

*!*
admin.name = 'Петро'; // змінено за посиланням зі змінної "admin"
*/!*

alert(*!*user.name*/!*); // 'Петро', зміни видно з посилання зі змінної "user"
```

Уявіть, що об’єкт -- це шафа з якимись данними (властивостями). А "адреса" цієї шафи зберігається у двох шухлядах. Спочатку ми використовуємо одну з них (`admin`), щоб дістатися цієї шафи та щось змінити. Потім, якщо ми використаємо іншу шухляду (`user`), ми все ще відкриємо ту саму шафу і отримаємо доступ до зміненого вмісту.

## Comparison by reference

Two objects are equal only if they are the same object.

For instance, here `a` and `b` reference the same object, thus they are equal:

```js run
let a = {};
let b = a; // copy the reference

alert( a == b ); // true, both variables reference the same object
alert( a === b ); // true
```

And here two independent objects are not equal, even though they look alike (both are empty):

```js run
let a = {};
let b = {}; // two independent objects

alert( a == b ); // false
```

For comparisons like `obj1 > obj2` or for a comparison against a primitive `obj == 5`, objects are converted to primitives. We'll study how object conversions work very soon, but to tell the truth, such comparisons are needed very rarely -- usually they appear as a result of a programming mistake.

## Cloning and merging, Object.assign [#cloning-and-merging-object-assign]

So, copying an object variable creates one more reference to the same object.

But what if we need to duplicate an object? Create an independent copy, a clone?

That's also doable, but a little bit more difficult, because there's no built-in method for that in JavaScript. But there is rarely a need -- copying by reference is good most of the time.

But if we really want that, then we need to create a new object and replicate the structure of the existing one by iterating over its properties and copying them on the primitive level.

Like this:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// now clone is a fully independent object with the same content
clone.name = "Pete"; // changed the data in it

alert( user.name ); // still John in the original object
```

Also we can use the method [Object.assign](mdn:js/Object/assign) for that.

The syntax is:

```js
Object.assign(dest, [src1, src2, src3...])
```

- The first argument `dest` is a target object.
- Further arguments `src1, ..., srcN` (can be as many as needed) are source objects.
- It copies the properties of all source objects `src1, ..., srcN` into the target `dest`. In other words, properties of all arguments starting from the second are copied into the first object.
- The call returns `dest`.

For instance, we can use it to merge several objects into one:
```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);
*/!*

// now user = { name: "John", canView: true, canEdit: true }
```

If the copied property name already exists, it gets overwritten:

```js run
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // now user = { name: "Pete" }
```

We also can use `Object.assign` to replace `for..in` loop for simple cloning:

```js
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

It copies all properties of `user` into the empty object and returns it.

There are also other methods of cloning an object, e.g. using the [spread syntax](info:rest-parameters-spread) `clone = {...user}`, covered later in the tutorial.

## Nested cloning

Until now we assumed that all properties of `user` are primitive. But properties can be references to other objects. What to do with them?

Like this:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
```

Now it's not enough to copy `clone.sizes = user.sizes`, because the `user.sizes` is an object, it will be copied by reference. So `clone` and `user` will share the same sizes:

Like this:

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, same object

// user and clone share sizes
user.sizes.width++;       // change a property from one place
alert(clone.sizes.width); // 51, see the result from the other one
```

To fix that, we should use a cloning loop that examines each value of `user[key]` and, if it's an object, then replicate its structure as well. That is called a "deep cloning".

We can use recursion to implement it. Or, to not reinvent the wheel, take an existing implementation, for instance [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) from the JavaScript library [lodash](https://lodash.com).

````smart header="Const objects can be modified"
An important side effect of storing objects as references is that an object declared as `const` *can* be modified.

For instance:

```js run
const user = {
  name: "John"
};

*!*
user.name = "Pete"; // (*)
*/!*

alert(user.name); // Pete
```

It might seem that the line `(*)` would cause an error, but it does not. The value of `user` is constant, it must always reference the same object, but properties of that object are free to change.

In other words, the `const user` gives an error only if we try to set `user=...` as a whole.

That said, if we really need to make constant object properties, it's also possible, but using totally different methods. We'll mention that in the chapter <info:property-descriptors>.
````

## Summary

Objects are assigned and copied by reference. In other words, a variable stores not the "object value", but a "reference" (address in memory) for the value. So copying such a variable or passing it as a function argument copies that reference, not the object itself.

All operations via copied references (like adding/removing properties) are performed on the same single object.

To make a "real copy" (a clone) we can use `Object.assign` for the so-called "shallow copy" (nested objects are copied by reference) or a "deep cloning" function, such as [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
