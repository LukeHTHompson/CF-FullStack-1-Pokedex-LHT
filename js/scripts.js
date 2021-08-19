// Setup an IIFE to contain and protect pokemonList
let pokemonRepository = (function () {
  // Create an empty array to populate in returns
  let pokemonList = [];

  // pokemonRepository.add(objectName) will add the object to pokemonList.
  // must be validated as an object with proper keys first.
  function add (pokemonObject) {
    if (
      (typeof (pokemonObject) === "object") &&
      Object.keys(pokemonObject).every((arrayItem) =>
      ["number", "name", "height", "types"].includes(arrayItem)
    )
  ) { pokemonList.push(pokemonObject); }
  }

  //pokemonRepository.getAll() will return contents of pokemonList
  function getAll () {
    return pokemonList;
  }

  function addListItem (pokemon) {
    let list = document.querySelector("ul");
    let button = document.createElement('button');
    button.innerText = "#" + pokemon.number + " - " + pokemon.name;
    button.classList.add("pokemon-buttons")
    list.appendChild(button);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
}) ();

//Setup Pokemon Objects for with pokemonRepository.add(object)
let Bellsprout = {
  number: 69,
  name: "Bellsprout",
  height: 0.7,
  types: ["Grass", "Poison"]
};

let Weepinbell = {
  number: 70,
  name: "Weepinbell",
  height: 1,
  types: ["Grass", "Poison"]
};

let Victreebel = {
  number: 71,
  name: "Victreebel",
  height: 1.7,
  types: ["Grass", "Poison"]
};

// Populate some data in pokemonList via pokemonRepository.add(object)
pokemonRepository.add(Bellsprout);
pokemonRepository.add(Weepinbell);
pokemonRepository.add(Victreebel);

// Function to search for pokemon
// function search(input) {
//   return pokemonRepository.getAll().filter(input => pokemonRepository.getAll().name === input);
// };

// Function to Search for Pokemon
function search(searchString) {
  return pokemonRepository.getAll().filter(
    // Using the next pokemon in the list, return the name, make it toLowerCase
    // then check if the searchString in lowercase is a part of the pokemon name we are on
    // perform this for all pokemon in the list to find all that match.
    (nextPokemonInList) => nextPokemonInList.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1
  );
}

// Replaced by element creation loop to supply pokemon to webpage: createPokemon

// Functions to print pokemon info
// function printNumberSpace(pokemon) {
//   document.write("#" + pokemon.number + " ")
// };
//
// function printNameSpace(pokemon) {
//   document.write(pokemon.name + " ")
// };
//
// function printHeight(pokemon) {
//   document.write("height: " + pokemon.height)
// };
//
// // Check height of pokemon based on threshold 1
// // Append extra comment for pokemon taller than 1
// function checkHeight(pokemon) {
//   if (pokemon.height > 1) {
//     document.write(" - That's one TALL Pokemon!")
//   }
// };
//
// function printPokemon() {
//   pokemonRepository.getAll().forEach(function(pokemon) {
//     document.write("<p>")
//     printNumberSpace(pokemon);
//     printNameSpace(pokemon);
//     printHeight(pokemon);
//     checkHeight(pokemon);
//     document.write("</p>")
//   });
// }

function createPokemon() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon)
  })
}

// Print all Pokemon data.
// printPokemon();
createPokemon();
