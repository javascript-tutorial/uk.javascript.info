function makeArmy() {

  let shooters = [];

  for(let i = 0; i < 10; i++) {
    let shooter = function() { // функція shooter
      alert( i ); // має показати свій номер
    };
    shooters.push(shooter);
  }

  return shooters;
}
