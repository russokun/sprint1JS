// Obtener los parámetros de búsqueda de la URL
const url = new URLSearchParams(window.location.search)
const id = url.get('id')
import { movies } from './modulos/fetchMovies.js'

document.addEventListener('moviesLoaded', () => {
  let movie = (array, key) => array.find( obj => obj.id == key)
  let CardParticular = movie => `
  <div class="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-15 mb-5 max-h-[calc(100vh-200px)] overflow-auto">
        <img src="https://moviestack.onrender.com/static/${movie.image}" alt="${movie.title}" class="w-64 h-auto float-left mr-8 mb-4">
        <h2 class="text-2xl font-semibold mb-4">${movie.title}</h2>
        <span class="bg-[#D2CCFF] font-black text-gray-700 px-2 py-1 rounded mr-2 self-center">${movie.tagline}</span>
        <h3 class="text-lg font-semibold mt-4 mb-2">Genres:</h3>
        <p class="text-gray-700 mb-4">${movie.genres}</p>
        <div class="float-left flex flex-col">
          <div class="mb-4">
          </div>
          <p class="text-gray-700 mb-4">${movie.overview}</p>
        </div>
        <h3 class="text-lg font-semibold mb-4">Aditional Details:</h3>
        <div class="clear-both">
          <table class="w-full border-collapse border border-solid border-gray-500 mb-5 ">
            <tr class="border-collapse border border-solid border-gray-500">
              <td class="font-semibold border-collapse border border-solid border-gray-500">Original Language:</td>
              <td>${movie.original_language}</td>
            </tr>
            <tr class="border-collapse border border-solid border-gray-500">
              <td class="font-semibold border-collapse border border-solid border-gray-500">Release Date:</td>
              <td>${movie.release_date}</td>
            </tr>
            <tr class="border-collapse border border-solid border-gray-500">
              <td class="font-semibold border-collapse border border-solid border-gray-500">Runtime:</td>
              <td>${movie.runtime} mins</td>
            </tr>
            <tr>
              <td class="font-semibold border-collapse border border-solid border-gray-500">Status:</td>
              <td>${movie.status}</td>
            </tr>
          </table>
        </div>
        <table class="w-full border-collapse border border-solid border-gray-500">
          <tr class="border-collapse border border-solid border-gray-500">
            <td class="font-semibold border-collapse border border-solid border-gray-500">Vote Average:</td>
            <td>${movie.vote_average}</td>
          </tr>
          <tr class="border-collapse border border-solid border-gray-500">
            <td class="font-semibold border-collapse border border-solid border-gray-500">Budget:</td>
            <td>USD ${movie.budget}</td>
          </tr>
          <tr class="border-collapse border border-solid border-gray-500">
            <td class="font-semibold border-collapse border border-solid border-gray-500">Revenue:</td>
            <td>USD ${movie.revenue}</td>
          </tr>
        </table>
      </div>`
      
      let contenedor = document.getElementById("main")
      contenedor.innerHTML = CardParticular(movie(movies, id))
})