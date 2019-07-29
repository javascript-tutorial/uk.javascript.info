Зазвичай, ми використовуємо великі букви для констант, які "жорстко закодовані" (hardcoded). Іншими словами, коли значення константи відоме до початку виконання скрипта і записується безпосередньо в код.

В нашому випадку, `birthday` саме така змінна. Тому для неї ми можемо використати великі букви.

<<<<<<< HEAD
На відмінну від попередньої, константа `age` обчислюється під час виконання скрипта. Сьогодні в нас один вік, а через рік вже зовсім інший. Вона є константою, тому що не змінюється під час виконання коду. Але вона "трохи менша" константа, ніж `birthday`, вона обчислюється, тому ми повинні зберегти її в нижньому регістрі.
=======
In contrast, `age` is evaluated in run-time. Today we have one age, a year after we'll have another one. It is constant in a sense that it does not change through the code execution. But it is a bit "less of a constant" than `birthday`: it is calculated, so we should keep the lower case for it.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
