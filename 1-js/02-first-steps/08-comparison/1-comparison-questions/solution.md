

```js no-beautify
5 > 4 → true
<<<<<<< HEAD
"ананас" > "яблуко" → false
"2" > "12" → true 
undefined == null → true 
undefined === null → false 
=======
"apple" > "pineapple" → false
"2" > "12" → true
undefined == null → true
undefined === null → false
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
null == "\n0\n" → false
null === +"\n0\n" → false
```

Ось чому такі результати:

<<<<<<< HEAD
1. Очевидно, 5 більше за 4. true.
2. Посимвольне порівняння, тому `false`.
3. Знову посимвольне порівняння. Перший символ рядка `"2"` більший за перший символ другого рядка — `"1"`.
4. Спеціальний випадок. Значення `null` і `undefined` рівні під час не строгого порівняння.
5. Строге порівняння різних типів, тому `false`.
6. Дивіться (4).
7. Строге порівняння різних типів.
=======
1. Obviously, true.
2. Dictionary comparison, hence false.
3. Again, dictionary comparison, first char of `"2"` is greater than the first char of `"1"`.
4. Values `null` and `undefined` equal each other only.
5. Strict equality is strict. Different types from both sides lead to false.
6. Similar to `(4)`, `null` only equals `undefined`.
7. Strict equality of different types.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
