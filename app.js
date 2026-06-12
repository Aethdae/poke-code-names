import {
  buttonClasses,
  imageHolderClasses,
  pokeCardClasses,
  pokeImageClasses,
  pokeNameClasses,
} from "./classNames.js";
import { PokeCard } from "./PokeCard.js";
import { Random } from "./Random.js";
import { testPokemon } from "./testPokemon.js";

async function main() {
  const seedForm = document.getElementById("seedForm");
  const seedDisplay = document.getElementById("seedDisplay");
  const pokeContainer = document.getElementById("pokeContainer");
  const pokeList = [];
  seedForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const seed = seedInput.value ? seedInput.value : Random.createSeed();
    seedDisplay.textContent = `Game seed: ${seed}`;
    const pokemon = selectPokemon(Random.createHash(seed)[0]);
    pokeContainer.textContent = "";
    pokeContainer.textContent = "Loading, please wait...";
    const pokePromises = await Promise.all(
      pokemon.map(async (pokemon) => {
        const pokeCard = await createPokemonCard(pokemon);
        return pokeCard;
      }),
    );

    pokeContainer.textContent = "";
    pokeContainer.append(...pokePromises);
  });

  //   createTestPokemon();
  displayTestPokemon();

  async function fetchPokemonData(pokeNum) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`);
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function createTestPokemon() {
    const testPokes = [];
    for (let x = 1; x < 26; x++) {
      const poke = await fetchPokemonData(x);
      testPokes.push(poke);
    }
    const removeExcess = testPokes.map((poke) => {
      return {
        name: poke.name,
        sprites: { front_default: poke.sprites.front_default },
        id: poke.id,
        weight: poke.weight,
      };
    });
    console.log(removeExcess);
  }

  async function createPokemonCard(pokeNum) {
    const pokeData = await fetchPokemonData(pokeNum);
    pokeList.push(pokeNum);

    const card = document.createElement("div");
    card.id = pokeNum;
    card.className = pokeCardClasses.join(" ");

    const name = document.createElement("h2");

    name.innerText = pokeData.name[0].toUpperCase() + pokeData.name.slice(1);
    name.className = pokeNameClasses.join(" ");

    const imgHolder = document.createElement("div");
    imgHolder.className = imageHolderClasses.join(" ");

    const picture = document.createElement("img");
    picture.className = pokeImageClasses.join(" ");
    picture.src = pokeData.sprites.front_default;
    picture.alt = `${pokeData.name} sprite`;
    imgHolder.appendChild(picture);

    const id = document.createElement("p");
    id.textContent = `National Pokedex #${pokeData.id}`;

    const weight = document.createElement("p");
    weight.textContent = `Weight: ${pokeData.weight}`;

    const button = document.createElement("button");
    button.className = buttonClasses.join(" ");
    button.textContent = "✓";

    card.append(name, imgHolder, id, weight);
    const pokeCard = new PokeCard({
      pokeNum: pokeNum,
      card,
      button: button,
    });
    return card;
  }

  function displayTestPokemon() {
    const cards = testPokemon.map((pokemon) => createPokemonTestCard(pokemon));
    pokeContainer.append(...cards);
  }

  function createPokemonTestCard(pokeData) {
    const card = document.createElement("div");
    card.id = pokeData.id;
    card.className = pokeCardClasses.join(" ");

    const name = document.createElement("h2");

    name.innerText = pokeData.name[0].toUpperCase() + pokeData.name.slice(1);
    name.className = pokeNameClasses.join(" ");

    const imgHolder = document.createElement("div");
    imgHolder.className = imageHolderClasses.join(" ");

    const picture = document.createElement("img");
    picture.className = pokeImageClasses.join(" ");
    picture.src = pokeData.sprites.front_default;
    picture.alt = `${pokeData.name} sprite`;
    imgHolder.appendChild(picture);

    const id = document.createElement("p");
    id.textContent = `National Pokedex #${pokeData.id}`;

    const weight = document.createElement("p");
    weight.textContent = `Weight: ${getWeight(pokeData.weight)}kg`;

    const button = document.createElement("button");
    button.className = buttonClasses.join(" ");
    button.textContent = "✓";

    card.append(name, imgHolder, id, weight);
    const pokeCard = new PokeCard({
      pokeNum: pokeData.id,
      card,
      button: button,
    });
    return card;
  }
  function getWeight(weight) {
    return Math.floor(weight / 10).toFixed(0);
  }

  function selectPokemon(seed) {
    const pokeArr = [];
    for (let i = 1; i < 1026; i++) {
      pokeArr.push(i);
    }
    const selected = [];
    const randGen = Random.createRand(seed);
    for (let x = 0; x < 25; x++) {
      const randNum = getRandomNumber(pokeArr.length, randGen);
      selected.push(pokeArr[randNum]);
      pokeArr.splice(pokeArr.indexOf(randNum), 1);
    }
    pokeArr.splice(0);
    return selected;
  }
  function getRandomNumber(amount, rand) {
    return Math.floor(amount * rand.rand());
  }
}

main();
