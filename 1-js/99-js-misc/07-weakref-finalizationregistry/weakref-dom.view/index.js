const startMessagesBtn = document.querySelector('.start-messages'); // (1)
const closeWindowBtn = document.querySelector('.window__button'); // (2)
const windowElementRef = new WeakRef(document.querySelector(".window__body")); // (3)

startMessagesBtn.addEventListener('click', () => { // (4)
    startMessages(windowElementRef);
    startMessagesBtn.disabled = true;
});

closeWindowBtn.addEventListener('click', () =>  document.querySelector(".window__body").remove()); // (5)

<<<<<<< HEAD
=======

>>>>>>> 20208769e528337949e946f526534d61d38bac47
const startMessages = (element) => {
    const timerId = setInterval(() => { // (6)
        if (element.deref()) { // (7)
            const payload = document.createElement("p");
<<<<<<< HEAD
            payload.textContent = `Повідомлення: Статус системи OK: ${new Date().toLocaleTimeString()}`;
            element.deref().append(payload);
        } else { // (8)
            alert("Елемент було видалено."); // (9)
            clearInterval(timerId);
        }
    }, 1000);
};
=======
            payload.textContent = `Message: System status OK: ${new Date().toLocaleTimeString()}`;
            element.deref().append(payload);
        } else { // (8)
            alert("The element has been deleted."); // (9)
            clearInterval(timerId);
        }
    }, 1000);
};
>>>>>>> 20208769e528337949e946f526534d61d38bac47
