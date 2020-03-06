importance: 5

---

# Що не так з цим тестом?

Що не так з тестом функціій `pow`, вказаним нижче?

```js
it("Підносить x до n-нного степеня", function() {
  let x = 5;

  let result = x;
  assert.equal(pow(x, 1), result);

  result *= x;
  assert.equal(pow(x, 2), result);

  result *= x;
  assert.equal(pow(x, 3), result);
});
```

P.S. Синтаксичних помилок не має і тести проходять.
