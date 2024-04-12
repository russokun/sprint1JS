import { movies } from './fetchMovies.js'
let movie = (array, key) => array.find( obj => obj.id == key)
let CardParticular = objeto => `
  <div class="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-15 mb-5 max-h-[calc(100vh-200px)] overflow-auto">
        <img src="https://moviestack.onrender.com/static/${objecto.image}" alt="${objeto.title}" class="w-64 h-auto float-left mr-8 mb-4">
        <h2 class="text-2xl font-semibold mb-4">${objeto.title}</h2>
        <span class="bg-[#D2CCFF] font-black text-gray-700 px-2 py-1 rounded mr-2 self-center">${objeto.tagline}</span>
        <h3 class="text-lg font-semibold mt-4 mb-2">Genres:</h3>
        <p class="text-gray-700 mb-4">${objeto.genres}</p>
        <div class="float-left flex flex-col">
          <div class="mb-4">
          </div>
          <p class="text-gray-700 mb-4">${objeto.overview}</p>
        </div>
        <h3 class="text-lg font-semibold mb-4">Aditional Details:</h3>
        <div class="clear-both">
          <table class="w-full border-collapse border border-solid border-gray-500 mb-5 ">
            <tr class="border-collapse border border-solid border-gray-500">
              <td class="font-semibold border-collapse border border-solid border-gray-500">Original Language:</td>
              <td>${objeto.original_language}</td>
            </tr>
            <tr class="border-collapse border border-solid border-gray-500">
              <td class="font-semibold border-collapse border border-solid border-gray-500">Release Date:</td>
              <td>${objeto.release_date}</td>
            </tr>
            <tr class="border-collapse border border-solid border-gray-500">
              <td class="font-semibold border-collapse border border-solid border-gray-500">Runtime:</td>
              <td>${objeto.runtime} mins</td>
            </tr>
            <tr>
              <td class="font-semibold border-collapse border border-solid border-gray-500">Status:</td>
              <td>${objeto.status}</td>
            </tr>
          </table>
        </div>
        <table class="w-full border-collapse border border-solid border-gray-500">
          <tr class="border-collapse border border-solid border-gray-500">
            <td class="font-semibold border-collapse border border-solid border-gray-500">Vote Average:</td>
            <td>${objeto.vote_average}</td>
          </tr>
          <tr class="border-collapse border border-solid border-gray-500">
            <td class="font-semibold border-collapse border border-solid border-gray-500">Budget:</td>
            <td>USD ${objeto.budget}</td>
          </tr>
          <tr class="border-collapse border border-solid border-gray-500">
            <td class="font-semibold border-collapse border border-solid border-gray-500">Revenue:</td>
            <td>USD ${objeto.revenue}</td>
          </tr>
        </table>
      </div>`
document.addEventListener('moviesLoaded', () => {
  movie
  CardParticular
  console.log(movies); // Aquí puedes acceder a movies una vez que se hayan cargado
})
export {movie}
export {CardParticular}
