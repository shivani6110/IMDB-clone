const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('shristy');

// load movies form omDb API

async function loadMovies(searchTerm){
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=1c2af8f8`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if(data.Response = "True") displayMoviesList(data.Search);
}

function findMovies(){
    let searchTerm = (movieSearchBox.value);
    if(searchTerm.length > 0){
       searchList.classList.remove('hide-search-list');
       loadMovies(searchTerm);
    }else{
        searchList.classList.add('hide-search-list');
    }
}

function displayMoviesList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setting
        //movie id in data-id
        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
           moviePoster = movies[idx].Poster;
        else
           moviePoster = "imgae_not_found.png";
           
        movieListItem.innerHTML = `
        <div class="search-item-thumbnail">
              <img src="${moviePoster}" />
            </div>
            <div class="search-item-info">
              <h3>${movies[idx].Title}</h3>
              <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMoviesDetails();
}

function loadMoviesDetails(){
    const searchListMovies =searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
           // console.log(movie.dataset.id)
           searchList.classList.add('hide-search-list');
           movieSearchBox.value = "";
           const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=1c2af8f8`);
           const movieDetails = await result.json();
           //  console.log(moviesDetails);
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class="movie-poster">
    <img src="${(details.Poster != "N/A") ? details.Poster : "images/image_not_found.png"}" alt="movieposter" />
  </div>
  <div class="movie-info">
    <h3 class="movie-title">${details.Title}</h3>
    <ul class="movie-misc-info">
      <li class="year">Year: ${details.Year}</li>
      <li class="rated">Ratings: ${details.Rated}</li>
      <li class="released">Released: ${details.Released}</li>
    </ul>
    <p class="genre">
      <b>Genre:</b> ${details.Genre}
    </p>
    <p class="writer">
      <b>Writer: </b>${details.Writer}
    </p>
    <p class="actors">
      <b>Actors: </b>${details.Actors}
    </p>
    <p class="plot">
      <b>Plot: </b>${details.Plot}
    </p>
    <p class="language"><b>Language: </b>${details.Language}</p>
    <p class="award">
      <b><i class="fas fa-award"></i></b> ${details.Awards}
  </div>`;
}

window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list')
    }
});