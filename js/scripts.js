// Setup an IIFE to contain and protect pokemonList
let pokemonRepository = (function () {
  // Create an empty array to populate in returns
  let pokemonList = [];

  //pokemonRepository.add(objectName) will add the object to pokemonList
  function add(pokemonObject) {
    pokemonList.push(pokemonObject);
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

printPokemon();






















// [
//   { name: "Bellsprout",
//     height: 0.7,
//     types: ["Grass", "Poison"]},
//
//   { name: "Weepinbell",
//     height: 1,
//     types: ["Grass", "Posion"]},
//
//   { name: "Victreebel",
//     height: 1.7,
//     types: ["Grass", "Poison"]},
// ];

// Print a list of all objects in pokemonList with their name and height.
// Each new line is a new paragrpah in the DOM. Alternate could be line 23 <br>
// function printPokemon1(){
//   for (let i=0; i < pokemonList.length; i++) {
//     document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ")");
//     if (pokemonList[i].height > 1) {
//       document.write(" - That's one TALL Pokemon!");
//     }
//     document.write("</p>");
//     // document.write("<br/>");
//   }
// }

//Print Pokemon list once
// printPokemon1();
