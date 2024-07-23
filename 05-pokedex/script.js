const $inputSearch = document.getElementById('search-input')
const $searchBtn = document.getElementById('search-button')
const $namePokemon = document.getElementById('pokemon-name')
const $idPokemon = document.getElementById('pokemon-id')
const $weightPokemon = document.getElementById('weight')
const $heightPokemon = document.getElementById('height')
const $infoContainer = document.getElementById('info-container')
const $statsPokemon = document.querySelectorAll('.stat')
const $typesPokemon = document.getElementById('types')

const URL = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/'

$searchBtn.addEventListener('click', async () => {

    const pokemon = $inputSearch.value.toLowerCase()
    const data = await fetchData(pokemon)
    showData(data)

})

const fetchData = async (pokemon) => {
    try {
        const urlPokemonApi = URL + pokemon
        const res = await fetch(urlPokemonApi)
        const data = await res.json()
        return data
    } catch (err) {
        alert("Pokémon not found")
        console.error(err)
    }
}

const tagImage = document.createElement("img")

const showData = (data) => {
    const { name, id, height, weight, stats, sprites, types } = data

    $namePokemon.textContent = name.toUpperCase()
    $idPokemon.textContent = '#' + id
    $weightPokemon.textContent = 'Weight: ' + weight
    $heightPokemon.textContent = 'Height: ' + height

    tagImage.src = sprites['front_default']
    tagImage.alt = name
    tagImage.id = 'sprite'
    $infoContainer.append(tagImage)

    $statsPokemon.forEach((stat, index) => {
        stat.textContent = stats[index]['base_stat']
    })

    $typesPokemon.innerHTML = types.map((type) => {
        const typeOfPower = type['type']['name']
        return `<span class="type ${typeOfPower}">${typeOfPower}</span>`
    }).join(' ')

}