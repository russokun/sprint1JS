let movies = [];

const moviesLoadedEvent = new Event('moviesLoaded');

fetch('https://moviestack.onrender.com/api/movies', {
    headers:{
        'X-API-Key':'0ff70d54-dc0b-4262-9c3d-776cb0f34dbd'
    }
})
.then(respuesta => respuesta.json())
.then(data => {
    movies = data.movies;
    document.dispatchEvent(moviesLoadedEvent); // Dispara el evento cuando las películas estén cargadas
})
.catch(error => console.log(error));
export {movies}