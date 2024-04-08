let crearCard = (title, image, tagline, overview, id) => {
  // Limitar la descripción (overview) a 50 caracteres
  const overviewLimitado = overview.length > 50 ? overview.slice(0, 50) + '...' : overview;
  // Crear el HTML de la card
  let cardHTML = `
      <div class="relative max-w-xs bg-[#ADADAD] shadow-lg rounded-lg overflow-hidden mr-4 mb-4">
          <img class="w-full h-56 object-cover object-center" src="${image}" alt="${title}">
          <div class="px-6 py-4">
              <h3 class="text-xl font-semibold text-[#FFFFFF] mb-2">${title}</h3>
              <h4 class="text-xl font-semibold text-[#FFFFFF] mb-2">${tagline}</h4>
              <p class="text-[#efefef] text-base">${overviewLimitado}</p>
              <a href="details.html?id=${id}" class="w-[5.5rem] absolute bottom-0 right-0 bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Details</a>
          </div>
      </div>`;
  return cardHTML; // Devolver el HTML de la card
};
function crearCardsMovies(moviesArray) {
  let cardsHTML = ''// Variable para almacenar todas las cards
  // Iterar sobre el array de movies y generar una card para cada una
  moviesArray.forEach(function(movie){
    // Llamar a la función crearCard() con los datos de cada movie y concatenar el HTML resultante
    cardsHTML += crearCard(movie.title, movie.image, movie.tagline, movie.overview, movie.id)
  })
  // Devolver el HTML de todas las cards generadas
  return cardsHTML
}
const contenedor = document.getElementById("contenedor")
contenedor.innerHTML = crearCardsMovies(movies)
//sprint2

// Utilizamos flat() y map() para obtener una lista plana de todos los géneros de todas las películas
const todosLosGeneros = movies.map(pelicula => pelicula.genres).flat()

// Utilizamos Set para eliminar duplicados y luego el operador de propagación para descomponer los géneros únicos
const generosUnicos = [...new Set(todosLosGeneros)]

const selectGenero = document.getElementById("selectGeneros");

// Agregar una opción "All" por defecto y seleccionarla en el select de géneros
const optionAll = document.createElement('option');
optionAll.text = 'All';
optionAll.value = 'all';
optionAll.selected = true;
document.getElementById('selectGeneros').add(optionAll);

// Itera a través de los géneros y crea las opciones
generosUnicos.forEach((genero) => {
  const option = document.createElement("option");
  option.value = genero; // El valor de la opción es el género
  option.textContent = genero; // El texto visible de la opción es el género
  selectGenero.appendChild(option); // Agrega la opción al select
});

// Variable para almacenar el género seleccionado actualmente
let generoActual = 'all';

// Trigger del evento change para mostrar todas las películas por defecto al seleccionar "All"
document.getElementById('selectGeneros').dispatchEvent(new Event('change'));

// Trigger del evento input para mostrar todas las películas por defecto al cargar la página
document.getElementById('search').dispatchEvent(new Event('input'));

// Función para renderizar las películas según el género actual y el texto de búsqueda
function renderizarPeliculas() {
  const textoBusqueda = document.getElementById('search').value.trim().toLowerCase();
  
  // Filtrar las películas según el género actual y el texto de búsqueda
  let peliculasFiltradas = [];
  if (generoActual === 'all') {
    peliculasFiltradas = movies;
  }
  else {
    peliculasFiltradas = movies.filter(movie => movie.genres.includes(generoActual));
  }
  peliculasFiltradas = peliculasFiltradas.filter(movie => movie.title.toLowerCase().includes(textoBusqueda));

  // Renderizar las películas filtradas
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = crearCardsMovies(peliculasFiltradas);
}

// Event listener para detectar cambios en el campo de búsqueda
document.getElementById('search').addEventListener('input', renderizarPeliculas);

// Event listener para detectar cambios en el select de géneros
document.getElementById('selectGeneros').addEventListener('change', function(){
  generoActual = this.value; // Actualizar el género seleccionado actualmente
  renderizarPeliculas(); // Renderizar las películas según el género actual y el texto de búsqueda
});

