$inputText = document.querySelector('#text-input')
$checkBtn = document.querySelector('#check-btn')


$checkBtn.addEventListener('click', () => {
    let word = $inputText.value
    if (word === ''){
        alert('Please input a value');
        return
    }

    $inputText.value = ''
    isPalindrome(word)

})

function isPalindrome(word) {
    let firstPart = word.split('').slice(0, word.length/2).join('')
    let secondPart = word.split('').slice(word.length%2 === 0 ? word.length/2 : word.length/2+1, word.length).reverse().join('')

    if (firstPart === secondPart)
        alert('Palindrome')
    else
        alert('No Palindrome')

}
