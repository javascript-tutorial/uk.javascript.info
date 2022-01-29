importance: 5

---

# Розширені комбінації гарячих клавіш

Створіть функцію `runOnKeys(func, code1, code2, ... code_n)`, яка запускає `func` при одночасному натисканні клавіш із кодами `code1`, `code2`, ..., `code_n`.

Наприклад, код нижче показує `alert`, коли `"Q"` та `"W"` натискаються разом (будь-якою мовою, з або без CapsLock)

```js no-beautify
runOnKeys(
  () => alert("Привіт!"),
  "KeyQ",
  "KeyW"
);
```

[demo src="solution"]
