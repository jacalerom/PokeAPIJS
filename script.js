const appContainer = document.querySelector(".appContainer");
const cardsContainer = document.querySelector(".cardsContainer");
const startBtn = document.querySelector("#startBtn");
const messageContainer = document.querySelector(".messageContainer");

let loading, levelP1, levelP2;

const url = `https://pokeapi.co/api/v2/pokemon/`;

async function apiCall(number) {
  const loadMessage = document.createElement("h1");
  cardsContainer.appendChild(loadMessage);
  loadMessage.innerText = "Loading...";
  try {
    const firstCall = await fetch(`${url}${number}`);
    const response = await firstCall.json();
    return response;
  } catch (error) {
    console.error("Error", error);
  } finally {
    cardsContainer.removeChild(loadMessage);
  }
}

async function start() {
  let pokemon1 = await apiCall(Math.round(Math.random() * 898));
  let pokemon2 = await apiCall(Math.round(Math.random() * 898));
  let currentPokemons = [pokemon1, pokemon2];
  currentPokemons.forEach((pokemon, index) => {
    startBtn.disabled = true;
    cardsContainer.display = "flex";
    const randomBtn = document.querySelector(".randomButton");
    randomBtn.style.display = "flex";
    const restartBtn = document.querySelector(".restartButton");
    restartBtn.style.display = "flex";
    const fightBtn = document.querySelector(".fightButton");
    fightBtn.style.display = "flex";
    const pokemonCard = document.createElement("div");
    pokemonCard.className = "pokemonCard";
    pokemonCard.id = "cardID";
    cardsContainer.appendChild(pokemonCard);
    const playerInfo = document.createElement("h2");
    playerInfo.innerText = `Player ${index + 1}`;
    pokemonCard.appendChild(playerInfo);
    const pokemonCardTop = document.createElement("div");
    pokemonCardTop.className = "pokemonCardTop";
    pokemonCard.appendChild(pokemonCardTop);
    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonCardTop.appendChild(pokemonImage);
    const pokemonCardBottom = document.createElement("div");
    pokemonCardBottom.className = "pokemonCardBottom";
    pokemonCard.appendChild(pokemonCardBottom);
    const pokemonDescription = document.createElement("div");
    if (index % 2 !== 0) {
        pokemonDescription.innerHTML = `<h3>Name: ${pokemon.species.name.toUpperCase()}</h3><h4>Experience level: ¿? </h4>`;
      levelP2 = pokemon.base_experience;
    } else {
        pokemonDescription.innerHTML = `<h3>Name: ${pokemon.species.name.toUpperCase()}</h3><h4>Experience level: ${
            pokemon.base_experience
        }</h4>`;
        levelP1 = pokemon.base_experience;
    }
    pokemonCardBottom.appendChild(pokemonDescription);
  });
}

async function restart() {
  startBtn.disabled = false;
  const restartBtn = document.querySelector(".restartButton");
  restartBtn.style.display = "none";
  const fightBtn = document.querySelector(".fightButton");
  fightBtn.style.display = "none";
  const randomBtn = document.querySelector(".randomButton");
  randomBtn.style.display = "none";
  cardsContainer.innerHTML = "";
  messageContainer.innerHTML = "";
}

async function random() {
  restart();
  start();
  cardsContainer.style.display = "flex";
}

async function fight() {
  const message = document.createElement("h2");
  message.className = "finalMessage";
  message.style.display = "flex";
  if (levelP1 > levelP2) {
    message.style.color = "red";
    message.innerText = `You lose! Your pokemon experience is ${levelP2}`;
  } else if (levelP1 < levelP2) {
    message.style.color = "green";
    message.innerText = `You win! Your pokemon experience is ${levelP2}`;
  } else {
    message.style.color = "black";
    message.innerText = "Draw";
  }
  messageContainer.appendChild(message);
  startBtn.display = "none";
  const fightBtn = document.querySelector(".fightButton");
  fightBtn.style.display = "none";
  const randomBtn = document.querySelector(".randomButton");
  randomBtn.style.display = "none";
}
