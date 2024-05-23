async function fetchMovies(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

function updateMovieInfo(movie, index, type) {
  const movieElement = document.querySelectorAll(`.${type} li`)[index];
  if (movieElement) {
    const moviePoster = movieElement.querySelector(".moviePoster");
    const movieName = movieElement.querySelector(".movieName");
    const rating = movieElement.querySelector(".rating");

    if (moviePoster && movieName && rating) {
      moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      movieName.textContent = movie.title;
      rating.textContent = movie.vote_average.toFixed(1);
    }
  }
}

async function displayMovies(type) {
  let url;
  if (type === "korea") {
    url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${movie_key}&language=ko-KR&page=1&region=KR`;
  } else {
    url = `https://api.themoviedb.org/3/movie/popular?api_key=${movie_key}&language=en-US&page=1`;
  }

  const movies = await fetchMovies(url);
  movies.forEach((movie, index) => {
    updateMovieInfo(movie, index, type);
  });
}

displayMovies("korea");
displayMovies("global");
