importance: 2

---

# Ланцюг викликів

<<<<<<< HEAD
Існує об'єкт `ladder`, що дозволяє підійматися вгору-вниз:
=======
There's a `ladder` object that allows you to go up and down:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js
let ladder = {
  step: 0,
  up() { 
    this.step++;
  },
  down() { 
    this.step--;
  },
  showStep: function() { // показує поточний крок
    alert( this.step );
  }
};
```

<<<<<<< HEAD
Тепер, якщо нам потрібно зробити кілька викликів послідовно, можна зробити це так:
=======
Now, if we need to make several calls in sequence, we can do it like this:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
```

<<<<<<< HEAD
Змініть код `up`, `down` і `showStep` так, щоб зробити доступним ланцюг викликів, наприклад:
=======
Modify the code of `up`, `down`, and `showStep` to make the calls chainable, like this:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
```

<<<<<<< HEAD
Такий підхід широко використовується в бібліотеках JavaScript.
=======
Such an approach is widely used across JavaScript libraries.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
