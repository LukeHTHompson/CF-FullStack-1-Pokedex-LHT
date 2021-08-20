// Setup an IIFE to contain and protect pokemonList
let pokemonRepository = (function () {
  // Create an empty array to populate in returns
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=898"

  // pokemonRepository.add(objectName) will add the object to pokemonList.
  // must be validated as an object with proper keys first.
  function add (pokemonObject) {
    if (
      (typeof (pokemonObject) === "object")
      // The validation on the next few lines was only for the test
      // array of pokemon that I setup, but the JSON will not pass this.
      //   &&
      //   Object.keys(pokemonObject).every((arrayItem) =>
      //   ["number", "name", "height", "types"].includes(arrayItem)
      // )
  ) { pokemonList.push(pokemonObject) }
  }

  //pokemonRepository.getAll() will return contents of pokemonList
  function getAll () {
    return pokemonList;
  }

  // Log to the console the pokemon's # and name when clicked
  // since # and name are the contents of the buttons, and our
  // event listener is set up on those buttons, use event.target
  // to find which button was pressed, then print its contents
  function showDetails (pokemon) {
    // let pokemonLogData = event.target.innerText + ":";
    loadDetails(pokemon).then(function () {
      // console.log(pokemonLogData);
      console.log(pokemon);
    });
  }

  // Add listener to new pokemon buttons after adding them.
  function newButtonListener (button, pokemon) {
    // Log the pokemon's # and name to console when clicked
    // Use an unnamed function that calls into showDetails with the pokemon
    // whose button we are currently clicking
    button.addEventListener("click", function() { showDetails(pokemon) } );
  }

  // Add a button to the end of the UI for each pokemon in the repository
  // also sets an event listener on the buttons to print pokemon data
  // to the log when a pokemon is clicked.
  function addListItem (pokemon) {
    let list = document.querySelector("ul");
    let button = document.createElement('button');
    // Format the pokemon names from the JSON to capitalize first letter
    // Commented out as example of how to do this JS, but can also be done in CSS:
    // CSS: text-transform: capitalize; will capitalize first letter of each word
    // JS:  let nameFormat = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    button.innerText = pokemon.name;
    button.classList.add("pokemon-buttons")
    list.appendChild(button);
    newButtonListener(button, pokemon);
  }

  function loadList() {
    // return the json plain text file as a promise object via fetch
    return fetch(apiUrl).then(function (response) {
      // we can use then, since fetch is a promise
      // this object is the plain text reformatted as a json via .json()
      // .json() also returns a promise object so we can keep using .then
      return response.json();
    }).then(function (json) {
      // look at the results of the json now that it is formatted as json
      // for each item make a pokemon object with the name and url from the item
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        // add that pokemon object to our list before continuing to the next item
        // add can be called directly here since we are still within the IIFE
        add(pokemon);
      });
      // Next we use a catch in case the json was not formatted correctly
    }).catch(function (e) {
      console.error(e);
    })
  }

  // Similar logic for then chains and data acquisition as loadList above
  function loadDetails(item) {
    let url= item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Here we have our json formatted data and can add it to the pokemon
      // The format of the values we are assigning is based on the json data
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.number = details.id;
      // Next we use a catch in case the json was not formatted correctly
    }).catch(function (e) {
      console.error(e);
    });
  }

  // Function to Search for Pokemon
  function search(searchString) {
    return pokemonRepository.getAll().filter(
      // Using the next pokemon in the list, return the name, make it toLowerCase
      // then check if the searchString in lowercase is a part of the pokemon name we are on
      // perform this for all pokemon in the list to find all that match.
      (nextPokemonInList) => nextPokemonInList.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1
    );
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    search: search
  };
}) ();

// Start by loading the pokemon to our list
pokemonRepository.loadList().then(function () {
  // At this point we should have all our pokemon data
  // Now go one by one and add the pokemon to our HTML unordered list
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// Redundant because of lines 82-89
// function createPokemon () {
//   pokemonRepository.getAll().forEach(function(pokemon) {
//     pokemonRepository.addListItem(pokemon)
//   })
// }
console.log(pokemonRepository.getAll())
