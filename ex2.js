const tmdbApiKey = "4878766355602e5dba7fc00d12fb5646";

document.getElementById("search").addEventListener("submit", function (event) {
  event.preventDefault();
  searchMovies();
});

function searchMovies() {
  const query = document.getElementById("search-query").value;
  if (query) {
    search(query);
  }
}

function search(query) {
  const tmdbSearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(
    query
  )}`;

  fetch(tmdbSearchUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.results && data.results.length > 0) {
        const movie = data.results[0];
        const tmdbMovieDiv = document.getElementById("tmdb-movie");
        const posterUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "No poster available";
        tmdbMovieDiv.innerHTML = `
            <h2>${movie.title}</h2>
            <img src="${posterUrl}" alt="${movie.title} Poster">
            <p>개봉일: ${movie.release_date}</p>
            <p>설명: ${movie.overview}</p>
            <p>평점: ${movie.vote_average}</p>
            
          `;
      } else {
        document.getElementById("tmdb-movie").innerHTML =
          "<p>검색하신 영화를 찾을 수 없습니다.</p>";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("tmdb-movie").innerHTML =
        "<p>Error fetching data from TMDb.</p>";
    });
}
