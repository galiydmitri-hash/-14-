const btn = document.querySelector('.btn');
const input = document.querySelector('.input');
const inputcon = document.querySelector('.inputcon');

const navcon = document.querySelector('.navcon');
const navbar = document.querySelector('.navbar');
const btn2 = document.querySelector('.btn2');
const img = document.querySelector('.imgset');
const body = document.body;
const cute = document.querySelector('.cute');

let textList = JSON.parse(localStorage.getItem('savedTexts')) || [];

// 1. Улучшенная функция переключения картинки
function togglePlaceholderImage() {
    if (!cute) return; // Защита от ошибок, если картинка не найдена
    
    if (inputcon.querySelectorAll('.inputcon-item').length > 0) {
        cute.remove(); // Удаляем картинку, если карточки есть
    } else {
        // Добавляем картинку обратно, только если её ещё нет внутри контейнера
        if (!inputcon.contains(cute)) {
            inputcon.append(cute); 
        }
    }
}

function createCard(textValue) {
    const card = document.createElement('div');
    card.classList.add('inputcon-item');

    if (body.classList.contains('is-bright')) {
        card.classList.add('is-bright');
    }

    const inputtext = document.createElement('p');
    inputtext.classList.add('inputtext');
    inputtext.textContent = textValue;

    if (body.classList.contains('is-bright')) {
        inputtext.classList.add('is-bright');
    }

    const controlaria = document.createElement('div');
    controlaria.classList.add('controlaria');

    const deleteImg = document.createElement('img');
    deleteImg.setAttribute('tabindex', '0');
    deleteImg.src = 'Photo/Delete.webp';
    deleteImg.alt = 'Delete';
    deleteImg.classList.add('delete');
    deleteImg.style.width = '40px';
    deleteImg.style.height = '40px';
    deleteImg.style.cursor = 'pointer';

    deleteImg.addEventListener('click', () => {
        card.remove();

        const index = textList.indexOf(textValue);
        if (index !== -1) {
            textList.splice(index, 1);
        }
        localStorage.setItem('savedTexts', JSON.stringify(textList));

        // Проверяем состояние после удаления карточки
        togglePlaceholderImage();
    });

    const copyImg = document.createElement('img');
    copyImg.src = 'Photo/Copy.webp';
    copyImg.alt = 'Copy';
    copyImg.setAttribute('tabindex', '0');
    copyImg.classList.add('copy');
    copyImg.style.width = '40px';
    copyImg.style.height = '40px';
    copyImg.style.cursor = 'pointer';

    copyImg.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(textValue);
            copyImg.style.transform = 'scale(0.9)';
            setTimeout(() => {
                copyImg.style.transform = 'scale(1)';
            }, 150);
        } catch (error) {
            console.error('Ошибка копирования:', error);
        }
    });

    controlaria.append(deleteImg, copyImg);
    card.append(inputtext, controlaria);

    inputcon.prepend(card);

    // Проверяем состояние после успешного добавления карточки
    togglePlaceholderImage();
}

// =========================================================================
// ЛОГИКА СТАРТА СТРАНИЦЫ (СТРОГИЙ ПОРЯДОК ВЫЗОВОВ)
// =========================================================================

// Шаг 1: Отрисовываем старые карточки из LocalStorage (если они есть)
textList.forEach(text => {
    createCard(text);
});

// Шаг 2: !!! ПЕРЕНЕСЛИ ВЫЗОВ СЮДА !!! 
// Теперь проверка запускается строго ПОСЛЕ отрисовки всех карточек. Мигания не будет.
togglePlaceholderImage();

// Шаг 3: Обработчик клика Enter
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const textValue = input.value.trim();
        if (textValue === '') return;

        textList.unshift(textValue); 
        localStorage.setItem('savedTexts', JSON.stringify(textList));
        
        createCard(textValue); 
        input.value = '';
    }
});

navcon.addEventListener('click', () => {

    img.classList.toggle('is-active');

    navcon.classList.toggle('is-active');

    navbar.classList.toggle('is-active');
});

btn.addEventListener('click', () => {

    body.classList.toggle('is-bright');

    img.classList.toggle('is-bright');

    navcon.classList.toggle('is-bright');

    btn2.classList.toggle('is-bright');

    btn.classList.toggle('is-bright');

    input.classList.toggle('is-bright');

    // ======================
    // UPDATE ALL CARDS
    // ======================

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