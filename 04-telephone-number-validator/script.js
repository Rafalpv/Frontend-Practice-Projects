const $check_btn = document.getElementById('check-btn')
const $cleaar_btn = document.getElementById('clear-btn')
const $results = document.getElementById('results-div')
const $input = document.getElementById('user-input')

$check_btn.addEventListener('click', (e) => {
    if(e.target.value === '')
        alert('Please provide a phone number')
    
    

})