document.addEventListener('DOMContentLoaded', function() {
    const $inputText = document.querySelector('#text-input');
    const $checkBtn = document.querySelector('#check-btn');
    const $result = document.querySelector('#result');

    $checkBtn.addEventListener('click', () => {
        let word = $inputText.value;
        if (word === '') {
            alert('Please input a value');
            return;
        }
        $inputText.value = '';
        isPalindrome(word);
    });

    function isPalindrome(word) {
        $result.replaceChildren();

        let wordToCheck = word.replace(/[^A-Za-z0-9]/gi, '').toLowerCase()

        let firstPart = wordToCheck.split('').slice(0, wordToCheck.length / 2).join('')
        let secondPart = wordToCheck.split('').slice(wordToCheck.length % 2 === 0 ? wordToCheck.length / 2 : wordToCheck.length / 2 + 1, wordToCheck.length).reverse().join('')

        console.log(firstPart);
        console.log(secondPart);
        
        let resultMsg = `<strong>${word}</strong> ${firstPart === secondPart ? 'is' : 'is not'} a palindrome`;

        const pTag = document.createElement('p');
        pTag.className = 'user-input';
        pTag.innerHTML = resultMsg;
        $result.appendChild(pTag);

        $result.classList.remove('hidden');
    }
});
