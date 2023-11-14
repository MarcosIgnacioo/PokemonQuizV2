function getRandomPokemonId() {
  return Math.trunc(Math.random() * (1009));
}
async function fetchPokemon(){
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${getRandomPokemonId()}/`)
  const data = await response.json();
  return data;
}
function getPokemonData(pokemonJSON){
  const {pokemon} = pokemonJSON 
  const {name} = pokemon;
  
  const {sprites} = pokemonJSON;
  const {front_default} = sprites;
  return {name,front_default, answer: false}
}
function selectCorrectAnswer(pokemonAnswers){
  pokemonAnswers[Math.floor(Math.random() * 3)].answer = true;
}
async function generatePokemonAnswers(pokemonArrayContainer, numberOfPokemon){
  if(pokemonArrayContainer.length < numberOfPokemon){
    const randomPokemon = await fetchPokemon(); 
    const pokemonData = getPokemonData(randomPokemon);
    pokemonArrayContainer.push(pokemonData);
    await generatePokemonAnswers(pokemonArrayContainer,numberOfPokemon);
  }
  else{
    selectCorrectAnswer(pokemonArrayContainer);
  }
}
export {generatePokemonAnswers}
