describe("byField", function(){

  let users = [
    { name: "Іван", age: 20, surname: "Іванов" },
    { name: "Петро", age: 18, surname: "Петров" },
    { name: "Енн", age: 19, surname: "Гетевей" },
  ];

  it("сортує користувачів за іменами", function(){
    let nameSortedKey = [
      { name: "Анна", age: 19, surname: "Хетеуей" },
      { name: "Іван", age: 20, surname: "Іванов"},
      { name: "Петро", age: 18, surname: "Петров" },
    ];
    let nameSortedAnswer = users.sort(byField("name"));
    assert.deepEqual(nameSortedKey, nameSortedAnswer);
  });

  it("сортує користувачів за віком", function(){
    let ageSortedKey = [
      { name: "Петро", age: 18, surname: "Петров" },
      { name: "Енн", age: 19, surname: "Гетевей" },
      { name: "Іван", age: 20, surname: "Іванов"},
    ];
    let ageSortedAnswer = users.sort(byField("age"));
    assert.deepEqual(ageSortedKey, ageSortedAnswer);
  });

  it("сортує користувачів за прізвищем", function(){
    let surnameSortedKey = [
      { name: "Анна", age: 19, surname: "Хетеуей" },
      { name: "Іван", age: 20, surname: "Іванов"},
      { name: "Петро", age: 18, surname: "Петров" },
    ];
    let surnameSortedAnswer = users.sort(byField("surname"));
    assert.deepEqual(surnameSortedAnswer, surnameSortedKey);
  });

});
