// Setup a variables to hold dynamic elements
const searchForm = document.querySelector('#searchForm')
const mainContent = document.querySelector('main')

// start by fetching ALL the pokemon names 
fetch('https://pokeapi.co/api/v2/pokemon/?limit=2000')
  .then(response => response.json())
  .then(response => {
    // Reveal the search box after we finished fetching the names
    searchForm.style.display = "block";
    // listen for form submission
    searchForm.addEventListener("submit", event => {
      // prevent the page from reloading when the form is submitted.
      event.preventDefault()
      // for every new search, reset/ blank out the contents of the page 
      mainContent.innerHTML = '';
      // get the user's search term from the search box.
      const searchTerm = document.querySelector('#searchText').value;


      // Below is a basic filter mechanism 
      // We use it to search through an array of all pokemon
      // and then create a new array of "matches" that only includes
      // pokemon whose names agree with the user's search term.
      // See also https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
      // We make everything lowercase to ensure consistent results.
      // See also https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase
      // We check for each pokemon if the name includes the user's search term
      // if it does, the condition returns "true", and the pokemon is added to "matches" 
      // see also https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
      const matches = response.results.filter(pokemon => {
        const pokemonNameLowerCase = pokemon.name.toLowerCase();
        const searchTermLowerCase = searchTerm.toLowerCase();
        return pokemonNameLowerCase.includes(searchTermLowerCase)
      })

      // Now that we have finished searching through the array
      // we are ready to iterate through the matching pokemon, 
      // and fetch details about them. 
      // This involves making a separate API request for each one
      // afterwards we pass the data to the display function for rendering
      matches.forEach(match => {
        let endpointURL = 'https://pokeapi.co/api/v2/pokemon/' + match.name
        // Run the request
        fetch(endpointURL)
          .then(response => response.json())
          .then(response => display(response))
          .catch(err => console.error(err));
      })
    })
  })
  .catch(err => console.error(err));

// For each pokemon, display some HTML
const display = (result) => {
  console.log(result)
  // create a div to contain the pokemon.
  let div = document.createElement('div');
  div.classList.add('result');
  // NOTE: not every pokemon includes an official image, 
  // therefore we have a fallback mechanism here to select an alternate image
  // in case the official image is missing. 
  let imgOfficial = result.sprites.other['official-artwork'].front_default;
  let imgSrc = (imgOfficial) ? imgOfficial : "pokeball.svg";
  // Make a simple template for the pokemon and add it to the page
  div.innerHTML =
    `<img src="${imgSrc}">
    <p class="name">${result.name}</p>  
    `
  // add the div to the main content area
  mainContent.appendChild(div)
}