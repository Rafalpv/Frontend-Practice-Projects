//import { words as INITIAL_WORDS } from './data.js';

const $time = document.querySelector("time");
const INITIAL_TIME = 30;
let currentTime = INITIAL_TIME;

function initGame() {
    $time.textContent = INITIAL_TIME;
}

function initEvents() {
    const intervalID = setInterval(() => {
        currentTime--;
        $time.textContent = currentTime;
        if (currentTime === 0) {
            clearInterval(intervalID);
        }
    }, 1000);
}

initGame();
initEvents();
