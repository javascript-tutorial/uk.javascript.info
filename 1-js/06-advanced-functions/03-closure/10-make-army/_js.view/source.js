function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // функція shooter
      alert( i ); // має показати свій номер
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

/*
let army = makeArmy();

army[0](); // 10 від стрільця за номером 0
army[5](); // та номер 5 також показує 10...
// ... всі функції показують 10 замість своїх номерів 0, 1, 2, 3...
*/
