import express from "express";
import axios from "axios";
import NodeCache from "node-cache";

const app = express(),
      port = 3000,
      API_URL = "https://pokeapi.co/api/v2";

const pokemonList = new NodeCache({ deleteOnExpire: false }),
      alreadyFetchedList = new NodeCache({ stdTTL: 120, checkperiod: 150 }),
      teamSize = 6;

app.get("/api", async (req, res) => {
  let generatedTeam = [],
      promises = [];

  if(pokemonList.getStats().keys == 0) {
    try {
      // Request list of all unique pokemons
      const response = await axios.get(API_URL + "/pokemon-species", {
        params: {
          offset: 0,
          limit: 20000,
        }
      });
      
      // Store pokemon data
      response.data.results.forEach(pokemon => {
        const id = pokemon.url.split('/')[6];
        
        if(!pokemonList.set(id, pokemon.name)) {
          console.error("Caching error");
        }
      });
    } catch(error) {
      console.error(`Error fetching pokemon list: ${error.message}`);
      res.status(500);
    }
  }

  __pickRandomIds().forEach(id => {
    if(alreadyFetchedList.has(id)) {
      const cachedPokemon = alreadyFetchedList.get(id);

      generatedTeam.push({
        id: id,
        name: __formatName(cachedPokemon.name),
        spriteURL: cachedPokemon.spriteURL,
      });
    } else {
      // Queue API request if the pokemon is not cached
      promises.push(axios.get(API_URL + "/pokemon/" + id));
    }
  });

  // Wait and process API requests
  await Promise.all(promises)
    .then((responses) => {
      responses.forEach((response) => {
        const id = response.data.id,
              name = pokemonList.get(id),
              spriteURL = response.data.sprites.front_default;
        
        // Cache fetched pokemons
        if(!alreadyFetchedList.set(id, { name: name, spriteURL: spriteURL })) {
          console.error("Caching error");
        }

        generatedTeam.push({
          id: id,
          name: __formatName(name),
          spriteURL: spriteURL,
        });
      });
    })
    .catch((error) => {
      console.error(`Error fetching pokemon data: ${error.message}`);
      res.status(500);
    });

  res.json({ data: generatedTeam });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function __pickRandomIds() {
  let numberOfPokemons = pokemonList.getStats().keys,
      randomNumbers = __generateRandomNumbers(numberOfPokemons, teamSize),
      pokemonIdList = pokemonList.keys(),
      randomIds = [];

  randomNumbers.forEach(num => {
    randomIds.push(pokemonIdList[num]);
  });

  return randomIds;
}

function __generateRandomNumbers(interval, size) {
  return __shuffleArray([...Array(interval).keys()]).slice(0, size)
}

function __shuffleArray(array) {
  let i = array.length,
      j = 0,
      temp;

  while(i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }

  return array;
}

function __formatName(name) {
  let splitName = name.split('-');

  for(let i = 0; i < splitName.length; i++) {
    splitName[i] = splitName[i].charAt(0).toUpperCase() + splitName[i].substring(1);
  }

  return splitName.join('-');
}