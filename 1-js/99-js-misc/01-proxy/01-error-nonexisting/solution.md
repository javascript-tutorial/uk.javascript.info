
```js run
let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      } else {
        throw new ReferenceError(`Властивість не існує: "${prop}"`)
      }
    }
  });
}

user = wrap(user);

alert(user.name); // Іван
alert(user.age); // ReferenceError: Властивість не існує: "age"
```
