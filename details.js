// Obtener los parámetros de búsqueda de la URL
const url = new URLSearchParams(window.location.search)
const id = url.get('id')
import { movies } from './modulos/fetchMovies.js'

document.addEventListener('moviesLoaded', () => {
  let movie = (array, key) => array.find( obj => obj.id == key)
let CardParticular = movie => `
  <div class="max-w-4xl mx-auto p-8 bg-gray-800 text-white shadow-lg rounded-lg mt-15 mb-5 max-h-[calc(100vh-200px)] overflow-auto flex flex-col">
        <div class="flex flex-row justify-between">
          <div class="flex flex-row">
            <img src="https://moviestack.onrender.com/static/${movie.image}" alt="${movie.title}" class="w-64 h-auto mr-8 mb-4">
            <div>
              <h2 class="text-2xl font-semibold mb-4">${movie.title}</h2>
              <span class="bg-purple-200 text-gray-700 px-2 py-1 rounded mr-2 self-center">${movie.tagline}</span>
              <p class="text-gray-300 mt-4 mb-4">${movie.overview}</p>
            </div>
          </div>
        </div>
        <h3 class="text-lg font-semibold mb-4">Aditional Details:</h3>
        <div class="flex flex-row flex-wrap justify-between">
          <div class="w-1/2 p-2">
            <strong>Original Language:</strong> ${movie.original_language}
          </div>
          <div class="w-1/2 p-2">
            <strong>Release Date:</strong> ${movie.release_date}
          </div>
          <div class="w-1/2 p-2">
            <strong>Runtime:</strong> ${movie.runtime} mins
          </div>
          <div class="w-1/2 p-2">
            <strong>Revenue:</strong> USD ${movie.revenue}
          </div>
          <div class="w-1/2 p-2">
            <strong>Vote Average:</strong> ${movie.vote_average}
          </div>
          <div class="w-1/2 p-2">
            <strong>Budget:</strong> USD ${movie.budget}
          </div>
          <div class="w-1/2 p-2">
            <strong>Genres:</strong> ${movie.genres}
          </div>
        </div>
      </div>`
      
      let contenedor = document.getElementById("main")
      contenedor.innerHTML = CardParticular(movie(movies, id))
})