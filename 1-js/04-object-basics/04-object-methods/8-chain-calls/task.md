importance: 2

---

# Ланцюг викликів

Існує об'єкт `ladder`, що дозволяє підійматися вгору-вниз:

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

Тепер, якщо нам потрібно зробити кілька викликів послідовно, можна зробити це так:

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
```

Змініть код `up`, `down` і `showStep` так, щоб зробити доступним ланцюг викликів, наприклад:

```js
ladder.up().up().down().showStep(); // 1
```

Такий підхід широко використовується в бібліотеках JavaScript.
