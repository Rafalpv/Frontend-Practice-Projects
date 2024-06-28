const $check_btn = document.getElementById('check-btn')
const $clear_btn = document.getElementById('clear-btn')
const $results = document.getElementById('results-div')
const $input = document.getElementById('user-input')

const regex = /^([+]?1[\s]?)?((?:[(](?:[2-9]1[02-9]|[2-9][02-8][0-9])[)][\s]?)|(?:(?:[2-9]1[02-9]|[2-9][02-8][0-9])[\s.-]?)){1}([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2}[\s.-]?){1}([0-9]{4}){1}$/;

const validNumber = (number) => {
  return regex.test(number);
}

$check_btn.addEventListener('click', (e) => {
    console.log(e)
    if ($input.value === "")
        alert('Please provide a phone number')
    else {
        $results.textContent = (validNumber($input.value) ? "Valid US number: " : "Invalid US number: ") + $input.value
    }

})

$clear_btn.addEventListener('click', () => {
    $results.textContent = ""
})

