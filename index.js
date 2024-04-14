import { movies } from './modulos/fetchMovies.js'
document.addEventListener('moviesLoaded', () => {
  let Card = (title, image, tagline, overview, id) => {
    // Limitar la descripción (overview) a 50 caracteres
    const overviewLimitado = overview.length > 50 ? overview.slice(0, 50) + '...' : overview
    // Crear el HTML de la card
    let cardHTML = `
        <div class="relative max-w-xs bg-[#ADADAD] shadow-lg rounded-lg overflow-hidden mr-4 mb-4 card">
        <label class="container">
          <input type="checkbox" id=${id}>
            <svg class=favoriteIcon height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g><path d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z"></path></g></g></svg>
        </label>
        <img class="w-full h-56 object-cover object-center" src="https://moviestack.onrender.com/static/${image}" alt="${title}">
            <div class="px-6 py-4">
                <h3 class="text-xl font-semibold text-[#FFFFFF] mb-2">${title}</h3>
                <h4 class="text-xl font-semibold text-[#FFFFFF] mb-2">${tagline}</h4>
                <p class="text-[#efefef] text-base">${overviewLimitado}</p>
                <a href="details.html?id=${id}" class="w-[5.5rem] absolute bottom-0 right-0 bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Details</a>
            </div>
        </div>`
    return cardHTML // Devolver el HTML de la card
  }
  function CardsMovies(moviesArray) {
    let cardsHTML = ''
    // Iterar sobre el array de movies y generar una card para cada una
    moviesArray.forEach(function(movie){
      // Llamar a la función crearCard() con los datos de cada movie y concatenar el HTML resultante
      cardsHTML += Card(movie.title, movie.image, movie.tagline, movie.overview, movie.id)
    })
    return cardsHTML
  }
  const contenedor = document.getElementById("contenedor")
  contenedor.innerHTML = CardsMovies(movies)
  //sprint2
  // Utilizamos flat() y map() para obtener una lista plana de todos los géneros de todas las películas
  const todosLosGeneros = movies.map(pelicula => pelicula.genres).flat()
  // Utilizamos Set para eliminar duplicados y luego el operador de propagación para descomponer los géneros únicos
  const generosUnicos = [...new Set(todosLosGeneros)]
  const selectGenero = document.getElementById("selectGeneros");
  const searcher = document.getElementById('search')
  // Agregar una opción "All" por defecto y seleccionarla en el select de géneros
  const optionAll = document.createElement('option');
  optionAll.text = 'All';
  optionAll.value = 'all';
  optionAll.selected = true;
  selectGenero.add(optionAll);
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
  selectGenero.dispatchEvent(new Event('change')); 
  //dispatch event es como insta despachar el event, tirarlo "default"
  // Trigger del evento input para mostrar todas las películas por defecto al cargar la página
  selectGenero.dispatchEvent(new Event('input'));
  // Función para renderizar las películas según el género actual y el texto de búsqueda
  
  function renderizarPeliculas() {
    const textoBusqueda = document.getElementById('search').value.toLowerCase();
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
    contenedor.innerHTML = CardsMovies(peliculasFiltradas);
  }
  // Event listener para detectar cambios en el campo de búsqueda
  searcher.addEventListener('input', renderizarPeliculas);
  // Event listener para detectar cambios en el select de géneros
  selectGenero.addEventListener('change', function(){
    generoActual = this.value; // Actualizar el género seleccionado actualmente
    renderizarPeliculas(); // Renderizar las películas según el género actual y el texto de búsqueda
  });
  //sprint3
  //agregamos propiedad de favs a movies
  movies.forEach(movie =>{
    movie.favs = false
  })
  let favs = new Set(JSON.parse(localStorage.getItem('favoritos')) || []); // Utiliza un Set en lugar de un array para favs
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  for (let checkbox of checkboxes) {
      const id = checkbox.getAttribute('id');
      const movie = movies.find(movie => movie.id === id);
  
    // Verificar si la película está en favs y marcar el checkbox si es así
    if (movie && favs.has(id)) { // has() para verificar la existencia en el Set
      checkbox.checked = true;
    }
    checkbox.addEventListener('click', (event) => {
      const id = checkbox.getAttribute('id');
      const movie = movies.find(movie => movie.id === id);
      if (movie && !favs.has(id)) { // Utiliza has() para verificar si la película ya está en favs
        movie.favs = true;
        favs.add(id); // Agrega el id al Set favs
      } else if (movie && favs.has(id)) {
        movie.favs = false;
        favs.delete(id); // Elimina el id del Set favs
      }
  
      // Guardar los favoritos en localStorage
      localStorage.setItem('favoritos', JSON.stringify(Array.from(favs))); // Convierte el Set en un array antes de guardarlo en localStorage
      
    });
  }
})
