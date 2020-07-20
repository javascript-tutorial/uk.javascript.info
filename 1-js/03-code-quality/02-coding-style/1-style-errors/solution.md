
Ви можете зробити наступні відмітки:

```js no-beautify
function pow(x,n)  // <- немає пробілу між аргументами
{  // <- фігурна дужка на окремому рядку
  let result=1;   // <- немає пробілу до і після знаку =
  for(let i=0;i<n;i++) {result*=x;}   // <- немає пробілів
  // те, що міститься у дужках { ... } повинно бути в окремому рядку
  return result;
}

<<<<<<< HEAD
let x=prompt("x?",''), n=prompt("n?",'') // <-- технічно можливо,
// але краще розподілити це на два рядки, також відсутні пробіли і пропущена ;
if (n<0)  // <- немає пробілів (n < 0), і перед цим блоком має бути вертикальний відступ (порожній рядок)
{   // <- фігурна дужка на окремому рядку
  // нижче - довгий рядок, який можна розділити на декілька, щоб його було простіше прочитати
=======
let x=prompt("x?",''), n=prompt("n?",'') // <-- technically possible,
// but better make it 2 lines, also there's no spaces and missing ;
if (n<=0)  // <- no spaces inside (n <= 0), and should be extra line above it
{   // <- figure bracket on a separate line
  // below - long lines can be split into multiple lines for improved readability
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
}
else // <- можна написати на одному рядку, наприклад "} else {"
{
  alert(pow(x,n))  // немає пробілів і пропущена ;
}
```

Виправлений варіант:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n <= 0) {
  alert(`Power ${n} is not supported,
    please enter an integer number greater than zero`);
} else {
  alert( pow(x, n) );
}
```
