# Використання рекурсії

Тут рекурсивна логіка трохи складна.

Нам потрібно спочатку вивести останні елементи списку, а *потім* вивести поточний:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printReverseList(list) {

  if (list.next) {
    printReverseList(list.next);
  }

  alert(list.value);
}

printReverseList(list);
```

# За допомогою циклу

Варіант з циклом також трохи складніший, ніж прямий вивід.

Немає можливості отримати останнє значення в нашому `list`. Ми також не можемо "повернутися назад".

Отже, що ми можемо зробити, так це спочатку пройти елементи в прямому порядку і запам’ятати їх у масиві, а потім вивести те, що ми запам’ятали, в зворотному порядку:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printReverseList(list) {
  let arr = [];
  let tmp = list;

  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    alert( arr[i] );
  }
}

printReverseList(list);
```

Зверніть увагу, що рекурсивне рішення фактично робить точно так само: проходиться списком, запам’ятовує елементи в ланцюжку вкладених викликів (у контекстному стеку виконання), а потім виводить їх. 
