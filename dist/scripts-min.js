let pokemonRepository=function(){let e=[],t="https://pokeapi.co/api/v2/pokemon/?limit=898";function n(t){"object"==typeof t&&Object.keys(t).every(e=>["name","detailsUrl"].includes(e))&&e.push(t)}function o(e,t){e.addEventListener("click",function(){!function(e){i(e).then(function(){})}(t)})}function i(e){let t=e.detailsUrl;return fetch(t).then(function(e){return e.json()}).then(function(t){e.imageUrl=t.sprites.front_default,e.height=t.height,e.types=t.types,e.number=t.id;let n=e.types.map(e=>e.type.name).join("/");!function(e,t){let n=document.querySelector("div.modal");document.querySelector("h5.modal-title").innerText=e,document.querySelector("div.modal-body").innerHTML=t,n.classList.add("is-visible")}(e.name+" ("+n+")","Height: "+e.height+(e.height>=10?"<br/>That's one TALL pokemon!":"")+"<br/><img src="+e.imageUrl+">")}).catch(function(e){console.error(e)})}return{add:n,getAll:function(){return e},addListItem:function(e){let t=document.querySelector("ul"),n=document.createElement("li"),i=document.createElement("button");i.innerText=e.name,i.id=e.name,i.classList.add("btn"),i.classList.add("pokemon-buttons"),i.setAttribute("data-toggle","modal"),i.setAttribute("data-target","#modal-container"),n.classList.add("pokemon-buttons"),n.classList.add("group-list-item"),n.id=e.name,t.appendChild(n),n.appendChild(i),o(i,e)},loadList:function(){return fetch(t).then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){n({name:e.name,detailsUrl:e.url})})}).catch(function(e){console.error(e)})},loadDetails:i,search:function(e){let t=pokemonRepository.getAll().filter(t=>t.name.toLowerCase().indexOf(e.toLowerCase())>-1)||this.pokemonList;document.querySelector("ul").innerHTML="",t.forEach(function(e){pokemonRepository.addListItem(e)})}}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})}),console.log(pokemonRepository.getAll());
