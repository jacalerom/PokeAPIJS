import { renderPokemonCards, setCardsInfo } from "./functions.js";

const url = "https://pokeapi.co/api/v2/pokemon/";

let currentPokemons;

//Funcionalidades asociadas a los botones

const getPokemonBtn = document.querySelector("#startBtn");
getPokemonBtn.addEventListener('click', async () => {
  await getNewPokemon();
})


const fightBtn = document.querySelector("#fightBtn");
fightBtn.addEventListener('click', () => {
  battlePokemon();
})

//Funciones generales

//Función que renderiza las cartas de los pokemones enfrentados
const getPokemon = async () => {
    let pokemonArray = await setCardsInfo(url);
    currentPokemons = await renderPokemonCards(pokemonArray);
}

//Función que re-renderiza las cartas de los pokemones enfrentados
const getNewPokemon = async () => {
    document.querySelector(".cardsCont").innerHTML = '';
    await getPokemon();
}

//Función que enfrenta ambas cartas y determina el ganador del duelo basado en el poder del ataque disponible

const battlePokemon = () => {
    const pokeMovePP1 = currentPokemons[0].movePP;
    const pokeMovePP2 = currentPokemons[1].movePP; 
    const battleResult = document.createElement('p');
    const battleHistory = document.querySelector('#historyCont');
    const pokemonOne = document.querySelectorAll('.pokemonName')[0].innerText;
    const pokemonTwo = document.querySelectorAll('.pokemonName')[1].innerText;

    if (pokeMovePP1 > pokeMovePP2) {
        battleResult.innerText = `${pokemonOne} defeated ${pokemonTwo}`;
        battleHistory.append(battleResult);
        getNewPokemon();
    }
    else if (pokeMovePP1 < pokeMovePP2) {
        battleResult.innerText = `${pokemonTwo} defeated ${pokemonOne}`
        battleHistory.append(battleResult);
        getNewPokemon();
    }
    else {
        battleResult.innerText = `It's a draw (${pokemonTwo} and ${pokemonOne})`
        battleHistory.append(battleResult);
        getNewPokemon();
    }
}