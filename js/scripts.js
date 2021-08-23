// Setup an IIFE to contain and protect pokemonList
let pokemonRepository = (function () {
  // Create an empty array to populate in returns
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=898"

  // pokemonRepository.add(objectName) will add the object to pokemonList.
  // must be validated as an object with proper keys first.
  function add (pokemonObject) {
    if (
      (typeof (pokemonObject) === "object") &&
        Object.keys(pokemonObject).every((arrayItem) =>
        ["name", "detailsUrl"].includes(arrayItem)
      )
    ) { pokemonList.push(pokemonObject) }
  }

  // Add listener to new pokemon buttons after adding them.
  function newButtonListener (button, pokemon) {
    button.addEventListener("click", function() {
      showDetails(pokemon)
    } );
  }

  // Add a button to the end of the UI for each pokemon in the repository
  // also sets an event listener on the buttons to print pokemon data
  // to the log when a pokemon is clicked.
  function addListItem (pokemon) {
    let list = document.querySelector("ul");
    let button = document.createElement('button');
    // Format the pokemon names from the JSON to capitalize first letter:
    // CSS: text-transform: capitalize; will capitalize first letter of each word
    // JS:  let nameFormat = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    button.innerText = pokemon.name;
    button.classList.add("pokemon-buttons");
    button.id = pokemon.name;
    list.appendChild(button);
    newButtonListener(button, pokemon);
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
      // Setup info to be displayed in modal
      let typeString = item.types.map((item) => item.type.name).join("/");
      let modalTitle = "${item.name} (${typeString})";

      let modalDetails =
      "Height: " + item.height +
      heightCheck(item.height) +
      "<br/>" +
      "<img src=" + item.imageUrl + ">";

      showModal (modalTitle, modalDetails);
      // showModal (item.name, (item.height + "<br/>" + "<img src=" + item.imageUrl + ">"));

      // Next we use a catch in case the json was not formatted correctly
    }).catch(function (e) {
      console.error(e);
    });
  }

  // print data from the API about this pokemon
  function showDetails (pokemon) {
    // let pokemonLogData = event.target.innerText + ":";
    loadDetails(pokemon).then(function () {
      // console.log(pokemonLogData);
      // console.log(pokemon);
    });
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

  //pokemonRepository.getAll() will return contents of pokemonList
  function getAll () {
    return pokemonList;
  }

  function heightCheck (height) {
    // Looked up that average pokemon heigh is about 4, so 10 really is tall!
    if (height >= 10) {
      return "<br/>" + "That's one TALL pokemon!"
    }
    else {
      return ""
    }
  }

  // Function to Search for Pokemon
  function search(searchString) {
      let filteredList =
              pokemonRepository.getAll().filter(nextPokemonInList =>
                nextPokemonInList.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1) || this.pokemonList;

      document.querySelector("ul").innerHTML = "";

      filteredList.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
      });
    }

  // MODAL CONTENT
  function showModal (title, text) {
    let modalContainer = document.querySelector("#modal-container");

    // Clear last modal content
    modalContainer.innerHTML = "";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    // Add new content for modal
    // Close button for the modal, on click runs closeModal function
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    // Adding a break in the DOM so that the floated close button
    // will not interfere with the CSS centering of the title
    let breakForCentering = document.createElement("br")

    // Title for the modal
    let titleElement = document.createElement("h1");
    titleElement.innerText = title;

    // main content for modal
    let contentElement = document.createElement("p");
    contentElement.innerHTML = text;

    // actually attach created HTML to the DOM
    // modal content to modal
    // modal to its container
    modal.appendChild(closeButtonElement);
    modal.appendChild(breakForCentering);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    // with new content now created and attached, show the modal
    modalContainer.classList.add("is-visible");
  }

  // hideModal here
  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  // Listener for window to close modal on key "ESC" if it is not hidden already
  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  let modalContainer = document.querySelector("#modal-container");
  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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

console.log(pokemonRepository.getAll());
