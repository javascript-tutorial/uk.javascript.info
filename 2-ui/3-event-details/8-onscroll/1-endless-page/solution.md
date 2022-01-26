Основою рішення є функція, яка додає більше дат на сторінку (або завантажує більше речей у реальному житті), поки ми знаходимося в кінці сторінки.

Ми можемо негайно викликати її та додати як обробник `window.onscroll`.

Найважливіше запитання: "Як ми виявимо, що сторінка прокручується вниз?"

Скористаємось координатами, відносними до вікна.

Документ представлений (і міститься) у тегу `<html>`, тобто `document.documentElement`.

Ми можемо отримати відносні до вікна координати всього документа як `document.documentElement.getBoundingClientRect()`, властивість `bottom` буде відносною до вікна координатою низа документа.

Наприклад, якщо висота всього HTML-документа дорівнює `2000px`, тоді:

```js
// коли ми знаходимося вгорі сторінки
// top відносний до вікна дорівнює 0
document.documentElement.getBoundingClientRect().top = 0

// bottom відносний до вікна дорівнює 2000
// документ довгий, тому він, ймовірно, знаходиться далеко за нижньою частиною вікна
document.documentElement.getBoundingClientRect().bottom = 2000
```

Якщо ми прокрутимо `500px` нижче, то:

```js
// Верхня частина документа знаходиться над вікном на 500px
document.documentElement.getBoundingClientRect().top = -500
// Нижня частина документа на 500px ближче
document.documentElement.getBoundingClientRect().bottom = 1500
```

Коли ми прокручуємо до кінця, припускаючи, що висота вікна дорівнює `600px`:


```js
// Верхня частина документа знаходиться над вікном на 1400px
document.documentElement.getBoundingClientRect().top = -1400
// Нижня частина документа знаходиться під вікном на 600px
document.documentElement.getBoundingClientRect().bottom = 600
```

Зауважте, що `bottom` не може бути `0`, оскільки він ніколи не досягає верхньої частини вікна. Найнижча межа `bottom` координати - це висота вікна (ми припустили, що це `600`), ми більше не можемо прокручувати вгору. 

Ми можемо отримати висоту вікна як `document.documentElement.clientHeight`.

Для нашого завдання нам потрібно знати, коли нижня частина документа знаходиться на відстані не більше ніж `100px` від неї (тобто: `600-700px`, якщо висота `600`). 

Отже, ось функція:

```js
function populate() {
  while(true) {
    // нижня частина документа
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

    // якщо користувач не прокрутив достатньо далеко (>100px до кінця)
    if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;
    
    // давайте додамо більше даних
    document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
  }
}
```
