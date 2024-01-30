//Función que llama a la PokeAPI general y retorna la info de un pokemon dado por su número

export async function callPokemon (url, number) {
    try {
      const firstCall = await fetch(`${url}${number}`);
      const response = await firstCall.json();
      return response;
    } catch (error) {
      document.querySelector(".cardsCont").innerHTML = "<h2>There's an error</h2>";
      console.error("Error", error);
    }
}

//Función que llama a la PokeAPI de movimientos y retorna la info de el movimiento seleccionado

export const callPokeMove = async (url) => {
    try {
      const firstCall = await fetch(`${url}`);
      const response = await firstCall.json();
      return response;
    } catch (error) {
      document.querySelector(".cardsCont").innerHTML = "<h2>There's an error</h2>";
      console.error("Error", error);
    }
}

//Función que asigna dos pokemones aleatorios (dados por números) a un array
//los cuales se mostrarán posteriormente en cada una de las cartas que serán desplegadas

export const setCardsInfo = async (url) => {
    let pokeArr = [];
    let pokemon1 = await callPokemon(url, Math.round(Math.random() * 1025));
    let pokemon2 = await callPokemon(url, Math.round(Math.random() * 1025));
    pokeArr.push(pokemon1);
    pokeArr.push(pokemon2);
    return pokeArr;
}

//Función que renderiza la info de un pokemón en su carta

export const displayPokemonData = async (data) => {
    const pokeContainer = document.createElement('div');
    pokeContainer.setAttribute('class', 'pokeCard');
    const name = document.createElement('h3');
    name.setAttribute('class', 'pokemonName');
    const img = document.createElement('img');
    const hp = document.createElement('p');
    const moves = document.createElement('p');

    name.innerText = data.name;
    img.src = data.sprites.front_shiny;
    hp.innerText = `HP: ${data.stats[5].base_stat}`;
    moves.innerText = 'Available random move:';

    const cardsCont = document.querySelector('.cardsCont');

    pokeContainer.appendChild(name);
    pokeContainer.appendChild(img);
    pokeContainer.appendChild(hp);
    pokeContainer.appendChild(moves);

    let randomMove = Math.floor(Math.random(data.moves.length));

    const move = document.createElement('p');
    const chosenMove = data.moves[randomMove];
    const moveUrl = chosenMove.move.url;

    const movePowerPoints = await callPokeMove(moveUrl);
    move.innerText = `${chosenMove.move.name} PP: ${movePowerPoints.pp}`;

    pokeContainer.appendChild(move);
    cardsCont.appendChild(pokeContainer);

    return {name: data.name, move: chosenMove.move.name, movePP: movePowerPoints.pp}
}

//Función que renderiza las cartas de los 2 pokemones enfrentados en duelo

export const renderPokemonCards = async (pokeDataArr) => {
    let pokemon1 = await displayPokemonData(pokeDataArr[0]);
    let pokemon2 = await displayPokemonData(pokeDataArr[1]);
    return [pokemon1, pokemon2]
}
