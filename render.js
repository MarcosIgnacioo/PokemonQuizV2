import { generatePokemonAnswers } from "./utilities.js";
let pokemonRendered = []
const htmlButtons = document.querySelectorAll('.options button')
const nextButton = document.querySelector('#nextButton')

function zipArrays(firstArray, secondArray){
  return firstArray.map((item,index) => [item, secondArray[index]])
}

function getPokemonAnswer(pokemonAnswers){
  return pokemonAnswers.filter((pokemon) => pokemon.answer)[0] 
}
async function loadQuizData(pokemonArray, numberOfAnswers){
  await generatePokemonAnswers(pokemonArray,numberOfAnswers)
}
async function renderPokemon(pokemonOptions){
  const imgContainer = document.querySelector('#pokemon_generated')
  const correctPokemon = getPokemonAnswer(pokemonOptions) 
    const {name} = correctPokemon;
    const {front_default} = correctPokemon

  const pokemonImg = document.createElement('img')
  pokemonImg.setAttribute('src',front_default)
  imgContainer.appendChild(pokemonImg)
  renderButtons(pokemonOptions, name)
}
function renderButtons(pokemonOptions, correctAnswer){
  const options = document.querySelector('.options')
  const nextButton = document.querySelector('#nextButton')
  for (const pokemon of pokemonOptions) {
    const {name} = pokemon
    const button = document.createElement('button')
    button.value = name
    button.textContent = name
    button.addEventListener('click', () => {
      button.classList.add((correctAnswer === name) ? 'correct' : 'incorrect')
      document.querySelector(`button[value="${correctAnswer}"`).classList.add('correct')
      nextButton.removeAttribute('hidden')
    })
    options.appendChild(button)
  }
}

function deleteOldGame(){
  const button = document.querySelector('#nextButton')
  button.setAttribute('hidden', '')
  const options = document.querySelector('.options')
  const optionButtons = Array.from(options.children)
  const imgContainer = document.querySelector('#pokemon_generated')
  const pokemonImg = imgContainer.children[0]
  for (const optionButton of optionButtons) {
    options.removeChild(optionButton)
  }
  imgContainer.removeChild(pokemonImg)
}
async function resetQuiz(){
  const newPokemonToRender = []
  deleteOldGame()
  await loadQuizData(newPokemonToRender,3)
  await renderPokemon(newPokemonToRender)
}

nextButton.addEventListener('click',() => resetQuiz())
const test = []
await loadQuizData(test,3)
await renderPokemon(test)
