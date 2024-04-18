import { words as INITIAL_WORDS } from './data.js'

const $time = document.querySelector('time');
const $paragraph = document.querySelector('p');

const INITIAL_TIME = 30;
let currentTime = INITIAL_TIME;

let words = []

function initGame() {
    $time.textContent = INITIAL_TIME;
    
    words = INITIAL_WORDS.toSorted(
        () => Math.random() - 0.5
    ).slice(0,50);

    $paragraph.innerHTML = words.map((word) => {
        const letters = word.split('')
        return `<word>
        ${letters
            .map(letter => `<letter>${letter}</letter>`)
            .join('')
          }
        </word>`
    }).join('')
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
