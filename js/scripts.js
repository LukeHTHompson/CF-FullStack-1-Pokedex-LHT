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
for (let i=0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")")
  if (pokemonList[i].height > 1) {
    document.write(" - That's one TALL Pokemon!")
  }
  document.write("<br/>")
}
