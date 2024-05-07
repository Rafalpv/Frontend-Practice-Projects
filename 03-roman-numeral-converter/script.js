const $numberInput = document.getElementById('number');
const $convertBtn = document.getElementById('convert-btn');
const $result = document.getElementById('output');
const numeralRomans = {
    'M': 1000,
    'CM': 900,
    'D': 500,
    'CD': 400,
    'C': 100,
    'XC': 90,
    'L': 50,
    'XL': 40,
    'X': 10,
    'IX': 9,
    'V': 5,
    'IV': 4,
    'I': 1
};


$convertBtn.addEventListener('click', () => {
    $result.innerText = "";
    checkInputNumber();
});

function checkInputNumber() {

    const number = parseInt($numberInput.value);

    if (!$numberInput.value) {
        $result.textContent = "Please enter a valid number";
        return;
    } else if (number < 1) {
        $result.textContent = "Please enter a number greater than or equal to 1";
        return;
    } else if (number > 3999) {
        $result.textContent = "Please enter a number less than or equal to 3999";
        return;
    }

    decimalToRoman(number);
}

function decimalToRoman(number) {

    for(let n in numeralRomans){
        while(number >= numeralRomans[n]){
            $result.innerText += n;
            number -=  numeralRomans[n];
        }
    }

    $numberInput.value = "";
}

