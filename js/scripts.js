let pokemonList = [
  { name: "Bellsprout",
    height: 0.7,
    types: ["Grass", "Poison"]},

  { name: "Weepinbell",
    height: 1,
    types: ["Grass", "Posion"]},

  { name: "Victreebel",
    height: 1.7,
    types: ["Grass", "Poison"]},
];

// Print a list of all objects in pokemonList with their name and height.
// Each new line is a new paragrpah in the DOM. Alternate could be line 23 <br>
function printPokemon(){
  for (let i=0; i < pokemonList.length; i++) {
    document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ")");
    if (pokemonList[i].height > 1) {
      document.write(" - That's one TALL Pokemon!");
    }
    document.write("</p>");
    //document.write("<br/>");
  }
}

//Print Pokemon list once
printPokemon();
