const btn = document.querySelector('.btn');
const input = document.querySelector('.input');
const inputcon = document.querySelector('.inputcon');

const navcon = document.querySelector('.navcon');
const navbar = document.querySelector('.navbar');
const btn2 = document.querySelector('.btn2');
const img = document.querySelector('.imgset');
const body = document.body;
const cute = document.querySelector('.cute');

const searcharea = document.querySelector('.searcharea');
const search = document.querySelector('.search');
const closeImg = document.querySelector('.closeimg');
const searchimg = document.querySelector('.searchimg');

// ======================================================
// LOCAL STORAGE
// ======================================================

let textList = JSON.parse(localStorage.getItem('savedTexts')) || [];

// ======================================================
// LIST.JS
// ======================================================

const options = {

    valueNames: [
        'taskid',
        'inputtext'
    ],

    item: `
        <li class="inputcon-item">

            <p class="taskid" hidden></p>

            <p class="inputtext"></p>

            <div class="controlaria">

                <img
                    tabindex="0"
                    src="Code/Photo/Delete.webp"
                    alt="Delete"
                    class="delete"
                    style="width:40px;height:40px;cursor:pointer;"
                >

                <img
                    tabindex="0"
                    src="Code/Photo/Copy.webp"
                    alt="Copy"
                    class="copy"
                    style="width:40px;height:40px;cursor:pointer;"
                >

            </div>

        </li>
    `
};

const userList = new List('users-list', options);

// ======================================================
// SAVE LOCAL STORAGE
// ======================================================

function saveLocalStorage() {

    const updatedList = [];

    userList.items.forEach(item => {

        updatedList.push({
            id: item.values().taskid,
            text: item.values().inputtext
        });
    });

    localStorage.setItem(
        'savedTexts',
        JSON.stringify(updatedList)
    );
}

// ======================================================
// PLACEHOLDER IMAGE
// ======================================================

function togglePlaceholderImage() {

    if (!cute) return;

    if (userList.items.length > 0) {

        cute.style.display = 'none';

    } else {

        cute.style.display = 'block';
    }
}

// ======================================================
// CARD EVENTS
// ======================================================

function attachCardEvents(item) {

    const cardEl = item.elm;

    const deleteImg = cardEl.querySelector('.delete');
    const copyImg = cardEl.querySelector('.copy');
    const inputtext = cardEl.querySelector('.inputtext');

    // ==================================================
    // LIGHT THEME
    // ==================================================

    if (body.classList.contains('is-bright')) {

        cardEl.classList.add('is-bright');

        inputtext?.classList.add('is-bright');
    }

    // ==================================================
    // DELETE
    // ==================================================

    deleteImg?.addEventListener('click', () => {

        const currentId = item.values().taskid;

        userList.remove('taskid', currentId);

        saveLocalStorage();

        togglePlaceholderImage();
    });

    // ==================================================
    // COPY
    // ==================================================

    copyImg?.addEventListener('click', async () => {

        try {

            await navigator.clipboard.writeText(
                item.values().inputtext
            );

            copyImg.style.transform = 'scale(0.9)';

            setTimeout(() => {

                copyImg.style.transform = 'scale(1)';

            }, 150);

        } catch (error) {

            console.error('Ошибка копирования:', error);
        }
    });
}

// ======================================================
// LOAD SAVED TASKS
// ======================================================

if (textList.length > 0) {

    const reversedList = [...textList].reverse();

    reversedList.forEach(task => {

        const addedItems = userList.add({

            taskid: task.id,
            inputtext: task.text
        });

        attachCardEvents(addedItems[0]);
    });
}

togglePlaceholderImage();

// ======================================================
// ADD TASK
// ======================================================

input?.addEventListener('keydown', (event) => {

    if (event.key !== 'Enter') return;

    const textValue = input.value.trim();

    if (textValue === '') return;

    const task = {

        id: Date.now().toString(),
        text: textValue
    };

    const addedItems = userList.add({

        taskid: task.id,
        inputtext: task.text
    });

    const newItem = addedItems[0];

    // ==================================================
    // PREPEND
    // ==================================================

    if (inputcon && newItem.elm) {

        inputcon.prepend(newItem.elm);
    }

    attachCardEvents(newItem);

    saveLocalStorage();

    input.value = '';

    togglePlaceholderImage();
});

// ======================================================
// NAVBAR
// ======================================================

navcon?.addEventListener('click', () => {

    img?.classList.toggle('is-active');

    navcon.classList.toggle('is-active');

    navbar?.classList.toggle('is-active');
});

// ======================================================
// THEME
// ======================================================

btn?.addEventListener('click', () => {

    body.classList.toggle('is-bright');

    img?.classList.toggle('is-bright');

    navcon?.classList.toggle('is-bright');

    btn2?.classList.toggle('is-bright');

    btn.classList.toggle('is-bright');

    input?.classList.toggle('is-bright');

    document.querySelectorAll('.inputcon-item')
        .forEach(el => {
            el.classList.toggle('is-bright');
        });

    document.querySelectorAll('.inputtext')
        .forEach(el => {
            el.classList.toggle('is-bright');
        });

    document.querySelectorAll('.backgroundbtn')
        .forEach(el => {
            el.classList.toggle('is-bright');
        });

    if (btn.classList.contains('is-bright')) {

        btn.textContent = 'Тёмная тема';

    } else {

        btn.textContent = 'Светлая тема';
    }
});

// ======================================================
// SEARCH OPEN
// ======================================================

searchimg?.addEventListener('click', () => {

    searcharea?.classList.add('is-active');

    search?.classList.add('is-active');

    closeImg?.classList.add('is-active');

    search?.focus();
});

// ======================================================
// SEARCH CLOSE
// ======================================================

closeImg?.addEventListener('click', () => {

    searcharea?.classList.remove('is-active');

    search?.classList.remove('is-active');

    closeImg?.classList.remove('is-active');

    search.value = '';

    userList.search();
});

// ======================================================
// SEARCH INPUT
// ======================================================

search?.addEventListener('input', () => {

    userList.search(search.value);
});
