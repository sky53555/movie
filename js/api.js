const koreaMovies = Array.from(
  document.querySelectorAll("#section1 .korea > li")
);
const globalMovies = Array.from(
  document.querySelectorAll("#section2 .global > li")
);
const prevBtn = document.querySelector("#section1 .prev-btn");
const nextBtn = document.querySelector("#section1 .next-btn");
const prevBtn2 = document.querySelector("#section2 .prev-btn");
const nextBtn2 = document.querySelector("#section2 .next-btn");

let startIndex = 0; // 한국 영화의 시작 인덱스
let startIndex2 = 0; // 해외 영화의 시작 인덱스

// 영화 api 가져오기
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

// 인덱스 인기차트
function showMovies(movies, startIndex) {
  movies.forEach((movie, index) => {
    if (index >= startIndex && index < startIndex + 4) {
      movie.style.display = "block"; // 보이기
    } else {
      movie.style.display = "none"; // 숨기기
    }
  });
}

showMovies(koreaMovies, startIndex);
showMovies(globalMovies, startIndex2);

nextBtn.addEventListener("click", function () {
  startIndex += 4; // 다음 4개의 한국 영화를 보여줌
  showMovies(koreaMovies, startIndex);
});

prevBtn.addEventListener("click", function () {
  startIndex -= 4; // 이전 4개의 한국 영화를 보여줌
  if (startIndex < 0) {
    startIndex = 0; // 음수가 되지 않도록 보정
  }
  showMovies(koreaMovies, startIndex);
});

nextBtn2.addEventListener("click", function () {
  startIndex2 += 4; // 다음 4개의 해외 영화를 보여줌
  showMovies(globalMovies, startIndex2);
});

prevBtn2.addEventListener("click", function () {
  startIndex2 -= 4; // 이전 4개의 해외 영화를 보여줌
  if (startIndex2 < 0) {
    startIndex2 = 0; // 음수가 되지 않도록 보정
  }
  showMovies(globalMovies, startIndex2);
});
