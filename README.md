# PokeSearch 

## Client Side Search
When an API lacks a search endpoint, we may still be able to build a basic search tool. Instead of relying on the server to perform the search, we might instead build the search feature on the client side. Assuming that we have an array of searchable items (e.g. an array of names and/or IDs, fetched via a list endpoint), it's possible to get JavaScript to filter the data based on user input. This demo shows how a search box UI can be created on the client side, and activated using the JavaScript `.filter()` function.

# Pokemon API
The Pokemon API does not have a search endpoint but it does allow us to fetch a list of all the available pokemon. This enables us to make a client-side search box that leverages array filtering.  See also: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
 