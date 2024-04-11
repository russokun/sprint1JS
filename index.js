//sprint1
let crearCard = (title, image, tagline, overview, id) => {
  const overviewLimitado = overview.length > 50 ? overview.slice(0, 50) + '...' : overview
  let cardHTML = `
      <div class="relative max-w-xs bg-[#ADADAD] shadow-lg rounded-lg overflow-hidden mr-4 mb-4">
          <img class="w-full h-56 object-cover object-center" src="${image}" alt="${title}">
          <div class="px-6 py-4">
              <h3 class="text-xl font-semibold text-[#FFFFFF] mb-2">${title}</h3>
              <h4 class="text-xl font-semibold text-[#FFFFFF] mb-2">${tagline}</h4>
              <p class="text-[#efefef] text-base">${overviewLimitado}</p>
              <a href="details.html?id=${id}" class="w-[5.5rem] absolute bottom-0 right-0 bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Details</a>
          </div>
      </div>`
  return cardHTML 
}
function crearCardsMovies(moviesArray) {
  let cardsHTML = ''
  moviesArray.forEach(function(movie){
    cardsHTML += crearCard(movie.title, movie.image, movie.tagline, movie.overview, movie.id)
  })
  return cardsHTML
}
const contenedor = document.getElementById("contenedor")
contenedor.innerHTML = crearCardsMovies(movies)
//sprint2

//flat() y map() para obtener una lista plana de todos los generos de todas las películas
const todosLosGeneros = movies.map(pelicula => pelicula.genres).flat()
//Set para eliminar duplicados y luego el operador de propagación para descomponer los géneros únicos
const generosUnicos = [...new Set(todosLosGeneros)]
const selectGenero = document.getElementById("selectGeneros")
const optionAll = document.createElement('option')
optionAll.text = 'All'
optionAll.value = 'all'
optionAll.selected = true
selectGenero.add(optionAll)
// Itera a través de los géneros y crea las opciones
generosUnicos.forEach((genero) => {
  const option = document.createElement("option")
  option.value = genero // El valor de la opción es el género
  option.textContent = genero // El texto visible de la opción es el género
  selectGenero.appendChild(option) // Lo mando al select
})
// Variable para almacenar el género seleccionado actualmente
let generoActual = 'all'
// Trigger del evento change para mostrar todas las películas por defecto al seleccionar "All"
selectGenero.dispatchEvent(new Event('change'))
// Trigger del evento input para mostrar todas las películas por defecto al cargar la página
selectGenero.dispatchEvent(new Event('input'))
// Función para renderizar las películas según el género actual y el texto de búsqueda
function renderizarPeliculas() {
  const textoBusqueda = document.getElementById('search').value.trim().toLowerCase()
  // Filtrar las películas según el género actual y el texto de búsqueda
  let peliculasFiltradas = []
  if (generoActual === 'all') {
    peliculasFiltradas = movies
  }
  else {
    peliculasFiltradas = movies.filter(movie => movie.genres.includes(generoActual))
  }
  peliculasFiltradas = peliculasFiltradas.filter(movie => movie.title.toLowerCase().includes(textoBusqueda))
  // Renderizar las películas filtradas
  const contenedor = document.getElementById("contenedor")
  contenedor.innerHTML = crearCardsMovies(peliculasFiltradas)
}
// Event listener para detectar cambios en el campo de búsqueda
document.getElementById('search').addEventListener('input', renderizarPeliculas)
// Event listener para detectar cambios en el select de géneros
document.getElementById('selectGeneros').addEventListener('change', function(){
  generoActual = this.value // Actualizar el género seleccionado actualmente
  renderizarPeliculas() // Renderizar las películas según el género actual y el texto de búsqueda
})
