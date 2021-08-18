//Example Pokemon Object for validation purposes
let aaa = {
  number: 0,
  name: "example",
  height: -999,
  types: ["just", "an", "example"]
};

// Setup an IIFE to contain and protect pokemonList
let pokemonRepository = (function () {
  // Create an empty array to populate in returns
  let pokemonList = [];

  // pokemonRepository.add(objectName) will add the object to pokemonList
  // input must be an object with set keys to be added.
  function add(pokemonObject) {
    if ( (typeof (pokemonObject) === "object") && (Object.keys(pokemonObject) === ["number","name","height","types"]) ){
      pokemonList.push(pokemonObject);
    }
  }

  //pokemonRepository.getAll() will return contents of pokemonList
  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

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

console.log(Object.keys(Bellsprout));
console.log(typeof (Bellsprout) === "object")
console.log(Object.keys(Bellsprout) === Object.keys(Bellsprout))
console.log(Object.keys(Weepinbell));
console.log(typeof (Weepinbell) === "object")
console.log(Object.keys(Weepinbell) === ['0','1','2','3'])
console.log(Object.keys(Victreebel));
console.log(typeof (Victreebel) === "object")
console.log(Object.keys(Victreebel) === ["number", "name", "height", "types"])

// Populate some data in pokemonList via pokemonRepository.add(object)
pokemonRepository.add(Bellsprout);
pokemonRepository.add(Weepinbell);
pokemonRepository.add(Victreebel);
console.log(pokemonRepository.getAll());

// Functions to print pokemon info
function printNumberSpace(pokemon) {
  document.write("#" + pokemon.number + " ")
}

function printNameSpace(pokemon) {
  document.write(pokemon.name + " ")
};

function printHeight(pokemon) {
  document.write("height: " + pokemon.height)
};

// Check height of pokemon based on threshold 1
// Append extra comment for pokemon taller than 1
function checkHeight(pokemon) {
  if (pokemon.height > 1) {
    document.write(" - That's one TALL Pokemon!")
  }
};

function printPokemon() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    document.write("<p>")
    printNumberSpace(pokemon);
    printNameSpace(pokemon);
    printHeight(pokemon);
    checkHeight(pokemon);
    document.write("</p>")
  });
}

// Print all Pokemon data.
printPokemon();
