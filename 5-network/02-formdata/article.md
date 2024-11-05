
# FormData

У цьому розділі йдеться про відправлення HTML-форм: з файлами та без, з додатковими полями й так далі.

Об’єкти [FormData](https://xhr.spec.whatwg.org/#interface-formdata) допоможуть нам із цим. Як ви, напевно, здогадалися за назвою, це об’єкт, що представляє дані HTML форми.

Конструктор:
```js
let formData = new FormData([form]);
```

Якщо передати в конструктор елемент HTML-форми `form`, то об’єкт, що створюється, автоматично прочитає з неї поля.

Його особливість полягає в тому, що методи для роботи з мережею, наприклад, `fetch`, дозволяють вказати об’єкт `FormData` у властивості тіла запиту `body`.

Тобто для сервера це виглядає як звичайне надсилання форми.

## Надсилання простої форми

Давайте спочатку надішлемо просту форму.

Як ви бачите, код дуже компактний:

```html run autorun
<form id="formElem">
  <input type="text" name="name" value="John">
  <input type="text" name="surname" value="Smith">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user', {
      method: 'POST',
*!*
      body: new FormData(formElem)
*/!*
    });

    let result = await response.json();

    alert(result.message);
  };
</script>
```

У цьому прикладі серверний код не представлений, він за рамками цієї статті, він приймає POST-запит із даними форми та відповідає повідомленням «Користувач збережений».

## Методи об’єкта FormData

За допомогою наведених нижче методів ми можемо змінювати поля в об’єкті `FormData`:

- `formData.append(name, value)` - додає до об’єкта поле з іменем `name` і значенням `value`,
- `formData.append(name, blob, fileName)` - додає поле так, ніби це `<input type="file">`, третій аргумент `fileName` встановлює ім’я файлу (не ім’я поля форми), ніби це ім’я з файлової системи користувача,
- `formData.delete(name)` - видаляє поле по заданому `name`,
- `formData.get(name)` - дістає значення поля по заданому `name`,
- `formData.has(name)` - перевіряє чи існує поле по заданому `name`, повертає `true`, інакше `false`

Технічно форма може мати багато полів з тим самим ім’ям `name`, тому кілька викликів `append` додадуть кілька полів з однаковими іменами.

Ще існує метод `set`, його синтаксис такий самий, як у `append`. Різниця в тому, що `.set` видаляє всі наявні поля з ім'ям `name` і тільки потім додає нове. Тобто цей метод гарантує, що існуватиме лише одне поле з ім'ям `name`, у всьому іншому він аналогічний `.append`:

- `formData.set(name, value)`,
- `formData.set(name, blob, fileName)`.

Поля об’єкта `formData` можна перебирати, використовуючи цикл `for..of`:

```js run
let formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');

// Список пар ключ/значення
for(let [name, value] of formData) {
  alert(`${name} = ${value}`); // key1 = value1, then key2 = value2
}
```

## Надсилання форми з файлом

Об’єкти `FormData` завжди посилаються із заголовком `Content-Type: multipart/form-data`, цей спосіб кодування дозволяє надсилати файли. Таким чином, поля `<input type="file">` відправляються так само, як і решта полів форми.

Приклад такої форми:

```html run autorun
<form id="formElem">
  <input type="text" name="firstName" value="John">
  Picture: <input type="file" name="picture" accept="image/*">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user-avatar', {
      method: 'POST',
*!*
      body: new FormData(formElem)
*/!*
    });

    let result = await response.json();

    alert(result.message);
  };
</script>
```

## Надсилання форми з даними Blob

Раніше у главі <info:fetch> ми бачили, що дуже легко відправити динамічно згенеровані бінарні дані у форматі `Blob`. Ми можемо явно передати їх до параметра `body` запиту `fetch`.

Але на практиці буває зручніше відправляти зображення не окремо, а у складі форми, додавши додаткові поля для імені та інші метадані.

Крім того, сервери часто налаштовані на приймання саме форм, а не просто бінарних даних.

У прикладі нижче надсилається зображення з `<canvas>` і ще кілька полів, як форма, використовуючи `FormData`:

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

*!*
      let formData = new FormData();
      formData.append("firstName", "John");
      formData.append("image", imageBlob, "image.png");
*/!*    

      let response = await fetch('/article/formdata/post/image-form', {
        method: 'POST',
        body: formData
      });
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

Будь ласка, зверніть увагу на те, як додається зображення `Blob`:

```js
formData.append("image", imageBlob, "image.png");
```

Це як би у формі був елемент `<input type="file" name="image">` і користувач прикріпив би файл з ім’ям `"image.png"` (3й аргумент) та даними `imageBlob` (2й аргумент) зі своєї файлової системи.

Сервер прочитає і дані і файл, так само, якби це була звичайна відправка форми.

## Підсумки

Об’єкти [FormData](https://xhr.spec.whatwg.org/#interface-formdata) використовуються, щоб взяти дані з HTML-форми та відправити їх за допомогою `fetch` або іншого методу для роботи з мережею.

Ми можемо створити такий об’єкт з даними, передавши в конструктор HTML-форму -- `new FormData(form)`, або ж можна створити об’єкт взагалі без форми і потім додати до нього поля за допомогою методів:

- `formData.append(name, value)`
- `formData.append(name, blob, fileName)`
- `formData.set(name, value)`
- `formData.set(name, blob, fileName)`

Зазначимо дві особливості:

1. Метод `set` видаляє поля з таким самим іменем, а `append` -- ні. У цьому їхня єдина відмінність.
2. Щоб надіслати файл, потрібно використовувати синтаксис з трьома аргументами, як третій вказується ім’я файлу, яке зазвичай, при `<input type="file">`, береться з файлової системи.

Інші методи:

- `formData.delete(name)`
- `formData.get(name)`
- `formData.has(name)`

От і все!
