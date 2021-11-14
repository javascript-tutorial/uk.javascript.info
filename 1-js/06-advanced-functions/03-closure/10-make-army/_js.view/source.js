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

army[0](); // стрілець під номером 0 показує 10
army[5](); // п’ятий стрілець показує 10...
// ... всі стрільці показують 10 замість своїх номерів 0, 1, 2, 3...
*/
