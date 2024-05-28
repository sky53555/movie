// js/pick me.js

let wishlist = [];

function toggleLike(element) {
  element.classList.toggle("clicked");
  const movieElement = element.closest("li");
  if (element.classList.contains("clicked")) {
    wishlist.push(movieElement.outerHTML);
  } else {
    wishlist = wishlist.filter((item) => item !== movieElement.outerHTML);
  }
  updateWishlist();
}

function updateWishlist() {
  const wishlistItems = document.getElementById("wishlistItems");
  wishlistItems.innerHTML = "";
  wishlist.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = item;
    wishlistItems.appendChild(li);
  });
}

document.getElementById("wishlistToggle").addEventListener("click", () => {
  const wishlist = document.getElementById("wishlist");
  wishlist.style.display = wishlist.style.display === "none" ? "block" : "none";
});

document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "7ff88bc9efd6d958c3571508ec714a7e";
  const KOREA_MOVIE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
  const GLOBAL_MOVIE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

  function fetchMovies(url, containerId) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const movies = data.results;
        const container = document.getElementById(containerId);
        container.innerHTML = "";
        movies.forEach((movie) => {
          const li = document.createElement("li");
          li.innerHTML = `
            <div class="imgWrap">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="moviePoster">
            </div>
            <div class="textWrap">
              <div class="textTop">
                <h2 class="movieName">${movie.title}</h2>
                <div class="topIcon" onclick="toggleLike(this)"><i class="fa-regular fa-heart"></i></div>
              </div>
              <p class="movieDesc">${movie.overview}</p>
            </div>
          `;
          container.appendChild(li);
        });
      });
  }

  fetchMovies(KOREA_MOVIE_URL, "koreaMovies");
  fetchMovies(GLOBAL_MOVIE_URL, "globalMovies");
});
