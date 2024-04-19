import { words as INITIAL_WORDS } from './data.js'

const $time = document.querySelector('time')
const $paragraph = document.querySelector('p')
const $input = document.querySelector('input')
const $game = document.querySelector('#game')

const INITIAL_TIME = 30;

let currentTime = INITIAL_TIME;
let words = []
let playing

initGame()
initEvents()

function initGame() {
    $time.textContent = INITIAL_TIME
    $game.style.display = 'flex'
    $input.value = ''

    playing = false;

    words = INITIAL_WORDS.toSorted(
        () => Math.random() - 0.5
    ).slice(0, 30);

    $paragraph.innerHTML = words.map((word) => {
        const letters = word.split('')
        return `<word>
        ${letters
                .map(letter => `<letter>${letter}</letter>`)
                .join('')
            }
        </word>`
    }).join('')

    const $fistWord = $paragraph.querySelector('word')
    $fistWord.classList.add('active');
    $fistWord.querySelector('letter').classList.add('active');
}

function initEvents() {
    document.addEventListener('keydown', () => {
        if (!playing) {
            $input.focus()
            playing = true
            const intervalID = setInterval(() => {
                currentTime--
                $time.textContent = currentTime
                if (currentTime === 0) {
                    clearInterval(intervalID)
                }
            }, 1000);
        }
    })

    $input.addEventListener('keydown', onKeyDown)
    $input.addEventListener('keyup', onKeyUp)
}

function onKeyDown(event) {

    const $currentWord = document.querySelector('word.active')
    const $currentLetter = document.querySelector('letter.active')

    const { key } = event

    if (key === ' ') {
        event.preventDefault()

        const $nextWord = $currentWord.nextElementSibling
        const $nextLetter = $nextWord.querySelector('letter')

        $currentWord.classList.remove('active', 'marked')
        $currentLetter.classList.remove('active')

        $nextWord.classList.add('active')
        $nextLetter.classList.add('active')

        $input.value = ''

        const hasMissedLetters = $currentWord.querySelectorAll('letter:not(.correct)').length > 0

        const classToAdd = hasMissedLetters ? 'marked' : 'correct'
        $currentWord.classList.add(classToAdd)

        return
    }

    if (key === 'Backspace') {
        const $prevWord = $currentWord.previousElementSibling
        const $prevLetter = $currentLetter.previousElementSibling

        if (!$prevWord && !$prevLetter) {
            event.preventDefault()
            return
        }

        const $wordMarked = $paragraph.querySelector('word.marked')
        if ($wordMarked && !$prevLetter) {
            event.preventDefault()
            $prevWord.classList.remove('marked')
            $prevWord.classList.add('active')

            const $letterToGo = $prevWord.querySelector('letter:last-child')

            $currentLetter.classList.remove('active')
            $letterToGo.classList.add('active')

            $input.value = [...$prevWord.querySelectorAll('letter.correct', letter.incorrect)].map($el => {
                return $el.classList.contains('correct') ? $el.innerText : '*'
            }).join('')
        }
    }
}

function onKeyUp() {
    const $currentWord = $paragraph.querySelector('word.active')
    const $currentLetter = $currentWord.querySelector('letter.active')

    const currentWord = $currentWord.innerText.trim()
    $input.maxLength = currentWord.length

    const $allLetters = $currentWord.querySelectorAll('letter')

    $allLetters.forEach($letter => $letter.classList.remove('correct', 'incorrect'))

    $input.value.split('').forEach((char, index) => {
        const $letter = $allLetters[index]
        const letterToCheck = currentWord[index]

        const isCorrect = char === letterToCheck
        const letterClass = isCorrect ? 'correct' : 'incorrect'
        $letter.classList.add(letterClass)
    })

    $currentLetter.classList.remove('active', 'is-last')
    const inputLength = $input.value.length
    const $nextActiveLetter = $allLetters[inputLength]

    if ($nextActiveLetter) {
        $nextActiveLetter.classList.add('active')
    } else {
        $currentLetter.classList.add('active', 'is-last')
        gameOver()
    }
}

function gameOver() {

}
