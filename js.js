const input1 = document.querySelector('.input1');
const input2 = document.querySelector('.input2');

const WORKING_DAYS = 13;
const SATURDAY = 6;
const SUNDAY = 0;

/**
 * Проверка на выходной
 */
function isWeekend(date) {
    const day = date.getDay();
    return day === SATURDAY || day === SUNDAY;
}

/**
 * Перенос даты на понедельник,
 * если выбрана суббота или воскресенье
 */
function moveToWorkingDay(date) {
    const day = date.getDay();

    if (day === SATURDAY) {
        date.setDate(date.getDate() + 2);
    } else if (day === SUNDAY) {
        date.setDate(date.getDate() + 1);
    }
}

/**
 * Формат DD-MM-YYYY
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}-${month}-${year}`;
}

function AddWorkingDays() {
    if (!input1.value) {
        input2.value = '';
        return;
    }

    const date = new Date(input1.value);

    if (Number.isNaN(date.getTime())) {
        input2.value = '';
        return;
    }

    // Если выбраны выходные —
    // переносим на понедельник
    moveToWorkingDay(date);

    let workingDaysRemaining = WORKING_DAYS;

    while (workingDaysRemaining > 0) {
        date.setDate(date.getDate() + 1);

        if (!isWeekend(date)) {
            workingDaysRemaining--;
        }
    }

    input2.value = formatDate(date);
}

input1.addEventListener('input', AddWorkingDays);

const copybtn = document.querySelector('.copybtn')
const copy1 = document.querySelector('.copy1')
const copy2 = document.querySelector('.copy2')
const dialog = document.querySelector('.dialog')

function copyText() {
    navigator.clipboard.writeText(input2.value);
}

copybtn.addEventListener('click', () => {
    copyText();
    copy1.style.transform = 'translateX(25%) translateY(-35%)';
    copy2.style.transform = 'translateX(0) translateY(0)';
    dialog.style.transform = 'translateY(0)';
    setTimeout(() => {
        copy1.style.transform = 'translateX(0) translateY(0)';
        copy2.style.transform = 'translateX(25%) translateY(-35%)';
        dialog.style.transform = 'translateY(120%)';
    }, 5000);
});

const navcon = document.querySelector('.navcon');
const navbar = document.querySelector('.navbar');
const btn = document.querySelector('.btn');
const img = document.querySelector('.imgset');
const body = document.querySelector('body');

navcon.addEventListener('click', () => {
    img.classList.toggle('is-active');
    navcon.classList.toggle('is-active')
    navbar.classList.toggle('is-active');
})

btn.addEventListener('click', () => {
    input1.classList.toggle('is-bright');
    input2.classList.toggle('is-bright');
    body.classList.toggle('is-bright');
    img.classList.toggle('is-bright');
    navcon.classList.toggle('is-bright');
    btn.classList.toggle('is-bright');

    if (btn.classList.contains('is-bright')){
        btn.textContent = 'Тёмная тема';
    } else{
        btn.textContent = 'Светлая тема';
    }
    
    copy1.classList.toggle('is-bright');
    copy2.classList.toggle('is-bright');
    dialog.classList.toggle('is-bright');
})