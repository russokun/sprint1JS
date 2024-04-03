function crearCard(title, image, tagline, overview){
  let cardHTML = `
      <div class="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden mr-4 mb-4">
        <img class="w-full h-56 object-cover object-center" src="${image}" alt="${title}">
        <div class="px-6 py-4">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">${title}<h3>
          <h4 class="text-xl font-semibold text-gray-800 mb-2">${tagline}<h4>
          <p class="text-gray-600 text-base">${overview}</p>
        </div>
      </div>
    `
    return cardHTML
}
function crearCardsMovies(moviesArray) {
  let cardsHTML = '' // Variable para almacenar todas las cards
  // Iterar sobre el array de movies y generar una card para cada una
  moviesArray.forEach(function(movie) {
      // Llamar a la función crearCard() con los datos de cada fruta y concatenar el HTML resultante
      cardsHTML += crearCard(movie.title, movie.image, movie.tagline, movie.overview);
  });
  // Devolver el HTML de todas las cards generadas
  return cardsHTML;
}
const contenedor = document.getElementById("contenedor")
contenedor.innerHTML = crearCardsMovies(movies)